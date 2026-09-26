// roadmap-service/prisma/seed.ts — Roadmap v2
// Run: npx ts-node prisma/seed.ts   (idempotent: safe to run more than once)
//
// Master data: course categories, grade scale, academic classifications (IU handbook 2022).
// Real data: the Data Science curriculum for cohort K2023 (2022 handbook chart), 135 credits.
// Demo data: departments, Intensive English courses, one course offering.

import { randomUUID } from 'crypto';
import { PrismaClient } from '../src/generated/prisma-client';
import {
  CATEGORIES,
  GRADE_SCALES,
  CLASSIFICATIONS,
  DEPARTMENTS,
  COURSES,
  NodeSeed,
  DATA_SCIENCE_2023,
  DATA_SCIENCE_2023_EDGES,
} from './seed-data';

const prisma = new PrismaClient();

async function seedMasterData() {
  for (const c of CATEGORIES) {
    await prisma.cOURSE_CATEGORIES.upsert({ where: { code: c.code }, update: {}, create: c });
  }
  for (const g of GRADE_SCALES) {
    await prisma.gRADE_SCALES.upsert({ where: { letter: g.letter }, update: {}, create: g });
  }
  for (const c of CLASSIFICATIONS) {
    await prisma.aCADEMIC_CLASSIFICATIONS.upsert({ where: { label_key: c.label_key }, update: {}, create: c });
  }
  console.log(`  ✅ ${CATEGORIES.length} categories, ${GRADE_SCALES.length} grade bands, ${CLASSIFICATIONS.length} classifications`);
}

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

async function seedCurriculum(
  majorId: number,
  cohortYear: number,
  totalCredits: number,
  decisionRef: string,
  semesterCount: number,
  nodes: NodeSeed[],
  edges: Array<[string, string, 'PREREQUISITE' | 'PREVIOUS' | 'COREQUISITE']>,
  courseId: Map<string, number>,
) {
  const existing = await prisma.rOADMAP_VERSIONS.findFirst({ where: { roadmap_id: majorId, cohort_year: cohortYear } });
  if (existing) return;

  await prisma.$transaction(async (tx) => {
    const version = await tx.rOADMAP_VERSIONS.create({
      data: {
        roadmap_id: majorId,
        cohort_year: cohortYear,
        revision_no: 1,
        total_credits: totalCredits,
        decision_ref: decisionRef,
        status: 'PUBLISHED',
        published_at: new Date(),
      },
    });

    const termId = new Map<string, number>();
    for (let s = 1; s <= semesterCount; s++) {
      const term = await tx.rOADMAP_TERMS.create({
        data: { version_id: version.id, term_key: randomUUID(), order_index: s - 1, kind: 'REGULAR', semester_no: s },
      });
      termId.set(String(s), term.id);
    }
    const pool = await tx.rOADMAP_TERMS.create({
      data: { version_id: version.id, term_key: randomUUID(), order_index: semesterCount, kind: 'ELECTIVE_POOL' },
    });
    termId.set('POOL', pool.id);

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
  });
  console.log(`  ✅ Curriculum ${cohortYear} (published, ${nodes.length} nodes, ${edges.length} relations)`);
}

async function seedDemo() {
  const departments = [];
  for (const d of DEPARTMENTS) {
    departments.push(await prisma.dEPARTMENTS.upsert({ where: { slug: d.slug }, update: {}, create: d }));
  }
  const computing = departments[0];
  console.log(`  ✅ ${departments.length} departments`);

  const courseId = await seedCourses();

  const dataScience = await prisma.mAJOR_ROADMAPS.upsert({
    where: { slug: 'data-science' },
    update: {},
    create: {
      slug: 'data-science',
      name: 'Data Science',
      description: 'Data Science program (curriculum K2023 from the 2022 handbook).',
      department_id: computing.id,
    },
  });
  await seedCurriculum(dataScience.id, 2023, 135, 'Handbook 2022 (K2023)', 8, DATA_SCIENCE_2023, DATA_SCIENCE_2023_EDGES, courseId);

  const internship = courseId.get('IT082IU')!;
  const offering = await prisma.cOURSE_OFFERINGS.findUnique({
    where: { course_id_academic_year: { course_id: internship, academic_year: 2025 } },
  });
  if (!offering) {
    await prisma.cOURSE_OFFERINGS.create({
      data: {
        course_id: internship,
        academic_year: 2025,
        status: 'PUBLISHED',
        has_project: true,
        project_description: 'Internship report and presentation at the end of the term.',
        student_guide:
          '**Demo.** Register when you have accumulated enough credits.\n\n' +
          'If the deadline comes and you have not found a company, email the Academic Affairs Office to request a drop.',
      },
    });
    console.log('  ✅ Demo offering IT082IU 2025-2026');
  }
}

async function main() {
  console.log('🌱 Seeding Roadmap Service (v2)...');
  await seedMasterData();
  await seedDemo();
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
