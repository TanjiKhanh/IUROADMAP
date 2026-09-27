// roadmap-service/prisma/seed.ts — Roadmap v2
// Run: npx ts-node prisma/seed.ts   (idempotent: safe to run more than once)
//
// This file only writes rows; what gets seeded lives in seed-data/:
// - course-categories.ts, grading.ts: master data (IU handbook 2022)
// - departments.ts, majors.ts: demo departments and the majors that have curricula
// - courses.ts: the course catalog shared by every curriculum
// - curricula/: real curricula, one file per major and cohort
//   (Data Science K2023, 135 credits; Computer Science K2023, 140 credits)
// - course-offerings.ts: demo offering

import { randomUUID } from 'crypto';
import { PrismaClient } from '../src/generated/prisma-client';
import { CATEGORIES } from './seed-data/course-categories';
import { COURSE_OFFERINGS } from './seed-data/course-offerings';
import { COURSES } from './seed-data/courses';
import { COMPUTER_SCIENCE_K2023 } from './seed-data/curricula/computer-science-k2023';
import { DATA_SCIENCE_K2023 } from './seed-data/curricula/data-science-k2023';
import { DEPARTMENTS } from './seed-data/departments';
import { CLASSIFICATIONS, GRADE_SCALES } from './seed-data/grading';
import { MAJORS } from './seed-data/majors';
import { CurriculumSeed } from './seed-data/types';

const CURRICULA: CurriculumSeed[] = [DATA_SCIENCE_K2023, COMPUTER_SCIENCE_K2023];

const prisma = new PrismaClient();

async function seedCourseCategories() {
  for (const c of CATEGORIES) {
    await prisma.cOURSE_CATEGORIES.upsert({ where: { code: c.code }, update: {}, create: c });
  }
  console.log(`  ✅ ${CATEGORIES.length} course categories`);
}

async function seedGrading() {
  for (const g of GRADE_SCALES) {
    await prisma.gRADE_SCALES.upsert({ where: { letter: g.letter }, update: {}, create: g });
  }
  for (const c of CLASSIFICATIONS) {
    await prisma.aCADEMIC_CLASSIFICATIONS.upsert({ where: { label_key: c.label_key }, update: {}, create: c });
  }
  console.log(`  ✅ ${GRADE_SCALES.length} grade bands, ${CLASSIFICATIONS.length} classifications`);
}

/** Returns department id by slug */
async function seedDepartments(): Promise<Map<string, number>> {
  const departmentId = new Map<string, number>();
  for (const d of DEPARTMENTS) {
    const record = await prisma.dEPARTMENTS.upsert({ where: { slug: d.slug }, update: {}, create: d });
    departmentId.set(d.slug, record.id);
  }
  console.log(`  ✅ ${DEPARTMENTS.length} departments`);
  return departmentId;
}

/** Returns major id by slug */
async function seedMajors(departmentId: Map<string, number>): Promise<Map<string, number>> {
  const majorId = new Map<string, number>();
  for (const m of MAJORS) {
    const record = await prisma.mAJOR_ROADMAPS.upsert({
      where: { slug: m.slug },
      update: {},
      create: { slug: m.slug, name: m.name, description: m.description, department_id: departmentId.get(m.departmentSlug)! },
    });
    majorId.set(m.slug, record.id);
  }
  console.log(`  ✅ ${MAJORS.length} majors`);
  return majorId;
}

/** Returns course id by code */
async function seedCourses(): Promise<Map<string, number>> {
  const categories = await prisma.cOURSE_CATEGORIES.findMany();
  const categoryId = new Map(categories.map((c) => [c.code, c.id]));
  const courseId = new Map<string, number>();
  for (const c of COURSES) {
    const record = await prisma.cOURSES.upsert({
      where: { code: c.code },
      update: {},
      create: {
        code: c.code,
        name: c.name,
        theory_credits: c.theory,
        lab_credits: c.lab,
        category_id: categoryId.get(c.category)!,
        grading_mode: c.gradingMode ?? 'SCORE',
        counts_toward_gpa: c.countsTowardGpa ?? true,
        counts_toward_credits: c.countsTowardCredits ?? true,
      },
    });
    courseId.set(c.code, record.id);
  }
  console.log(`  ✅ ${COURSES.length} courses`);
  return courseId;
}

/** Creates the curriculum as a published version, unless the major already has one for that cohort */
async function seedCurriculum(curriculum: CurriculumSeed, majorId: Map<string, number>, courseId: Map<string, number>) {
  const { majorSlug, cohortYear, totalCredits, decisionRef, terms, nodes, edges } = curriculum;
  const roadmapId = majorId.get(majorSlug)!;
  const existing = await prisma.rOADMAP_VERSIONS.findFirst({ where: { roadmap_id: roadmapId, cohort_year: cohortYear } });
  if (existing) return;

  await prisma.$transaction(async (tx) => {
    const version = await tx.rOADMAP_VERSIONS.create({
      data: {
        roadmap_id: roadmapId,
        cohort_year: cohortYear,
        revision_no: 1,
        total_credits: totalCredits,
        decision_ref: decisionRef,
        status: 'PUBLISHED',
        published_at: new Date(),
      },
    });

    const termId = new Map<string, number>();
    for (const [index, t] of terms.entries()) {
      const term = await tx.rOADMAP_TERMS.create({
        data: { version_id: version.id, term_key: randomUUID(), order_index: index, kind: t.kind, semester_no: t.semesterNo ?? null },
      });
      termId.set(t.key, term.id);
    }

    const nodeId = new Map<string, number>();
    for (const n of nodes) {
      const node = await tx.rOADMAP_NODES.create({
        data: {
          version_id: version.id,
          node_key: randomUUID(),
          term_id: termId.get(String(n.term))!,
          row_index: n.row,
          kind: n.course ? 'COURSE' : 'ELECTIVE_SLOT',
          course_id: n.course ? courseId.get(n.course)! : null,
          slot_label: n.slot?.label ?? null,
          slot_theory_credits: n.slot?.theory ?? null,
          slot_lab_credits: n.slot?.lab ?? null,
          elective_group: n.slot ? n.slot.group : n.electiveGroup ?? null,
          choice_group: n.branch?.choiceGroup ?? null,
          condition: n.branch?.condition ?? null,
        },
      });
      if (n.course) nodeId.set(n.course, node.id);
    }

    for (const [source, target, type] of edges) {
      await tx.rOADMAP_EDGES.create({
        data: {
          version_id: version.id,
          edge_key: randomUUID(),
          source_node_id: nodeId.get(source)!,
          target_node_id: nodeId.get(target)!,
          type,
        },
      });
    }
  }, { maxWait: 10_000, timeout: 120_000 });
  console.log(`  ✅ Curriculum ${majorSlug} K${cohortYear} (published, ${nodes.length} nodes, ${edges.length} relations)`);
}

async function seedCourseOfferings(courseId: Map<string, number>) {
  for (const o of COURSE_OFFERINGS) {
    const id = courseId.get(o.courseCode)!;
    const offering = await prisma.cOURSE_OFFERINGS.findUnique({
      where: { course_id_academic_year: { course_id: id, academic_year: o.academicYear } },
    });
    if (offering) continue;
    await prisma.cOURSE_OFFERINGS.create({
      data: {
        course_id: id,
        academic_year: o.academicYear,
        status: 'PUBLISHED',
        has_project: o.hasProject,
        project_description: o.projectDescription,
        student_guide: o.studentGuide,
      },
    });
    console.log(`  ✅ Demo offering ${o.courseCode} ${o.academicYear}-${o.academicYear + 1}`);
  }
}

async function main() {
  console.log('🌱 Seeding Roadmap Service (v2)...');
  await seedCourseCategories();
  await seedGrading();
  const departmentId = await seedDepartments();
  const majorId = await seedMajors(departmentId);
  const courseId = await seedCourses();
  for (const curriculum of CURRICULA) await seedCurriculum(curriculum, majorId, courseId);
  await seedCourseOfferings(courseId);
  console.log('✅ Done');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
