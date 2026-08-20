// roadmap-service/prisma/seed.ts
// Run: npx ts-node prisma/seed.ts

import { PrismaClient } from '../src/generated/prisma-client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Roadmap Service database...');

  // ─── Departments ─────────────────────────────────────────────────────────────

  const departments = await Promise.all([
    prisma.dEPARTMENTS.upsert({
      where: { slug: 'school-of-computing' },
      update: {},
      create: {
        slug: 'school-of-computing',
        name: 'School of Computing and Information Technology',
        description: 'Leading research and education in computing, software engineering, and information technology.',
      },
    }),
    prisma.dEPARTMENTS.upsert({
      where: { slug: 'school-of-business' },
      update: {},
      create: {
        slug: 'school-of-business',
        name: 'School of Business Administration',
        description: 'Business management, finance, marketing, and entrepreneurship programs.',
      },
    }),
    prisma.dEPARTMENTS.upsert({
      where: { slug: 'school-of-engineering' },
      update: {},
      create: {
        slug: 'school-of-engineering',
        name: 'School of Engineering',
        description: 'Civil, mechanical, electrical, and industrial engineering programs.',
      },
    }),
    prisma.dEPARTMENTS.upsert({
      where: { slug: 'school-of-biotechnology' },
      update: {},
      create: {
        slug: 'school-of-biotechnology',
        name: 'School of Biotechnology',
        description: 'Biotechnology, food science, and environmental science programs.',
      },
    }),
  ]);

  console.log(`  ✅ ${departments.length} departments seeded`);

  const [computing, business] = departments;

  // ─── Major Roadmaps ──────────────────────────────────────────────────────────

  const majors = await Promise.all([
    prisma.mAJOR_ROADMAPS.upsert({
      where: { slug: 'software-engineering' },
      update: {},
      create: {
        slug: 'software-engineering',
        name: 'Software Engineering',
        total_credits: 130,
        description: 'A comprehensive program focusing on modern software development, system design, and engineering practices.',
        department_id: computing.id,
      },
    }),
    prisma.mAJOR_ROADMAPS.upsert({
      where: { slug: 'computer-science' },
      update: {},
      create: {
        slug: 'computer-science',
        name: 'Computer Science',
        total_credits: 135,
        description: 'Core CS fundamentals including algorithms, data structures, AI, and theoretical computing.',
        department_id: computing.id,
      },
    }),
    prisma.mAJOR_ROADMAPS.upsert({
      where: { slug: 'information-systems' },
      update: {},
      create: {
        slug: 'information-systems',
        name: 'Information Systems',
        total_credits: 125,
        description: 'Management information systems, ERP, database management, and business intelligence.',
        department_id: computing.id,
      },
    }),
    prisma.mAJOR_ROADMAPS.upsert({
      where: { slug: 'business-administration' },
      update: {},
      create: {
        slug: 'business-administration',
        name: 'Business Administration',
        total_credits: 120,
        description: 'General business management, finance, marketing, and organizational leadership.',
        department_id: business.id,
      },
    }),
  ]);

  console.log(`  ✅ ${majors.length} majors seeded`);

  const [se, cs] = majors;

  // ─── Course Nodes (SE Roadmap) ───────────────────────────────────────────────

  const seCourseSlugs = [
    { slug: 'intro-programming', name: 'Introduction to Programming', credits: 3, coords: { x: 100, y: 100 } },
    { slug: 'data-structures', name: 'Data Structures & Algorithms', credits: 4, coords: { x: 300, y: 100 } },
    { slug: 'oop', name: 'Object-Oriented Programming', credits: 3, coords: { x: 300, y: 250 } },
    { slug: 'database-systems', name: 'Database Systems', credits: 3, coords: { x: 500, y: 100 } },
    { slug: 'web-development', name: 'Web Development', credits: 3, coords: { x: 500, y: 250 } },
    { slug: 'software-engineering-fundamentals', name: 'Software Engineering Fundamentals', credits: 4, coords: { x: 700, y: 175 } },
    { slug: 'operating-systems', name: 'Operating Systems', credits: 3, coords: { x: 700, y: 400 } },
    { slug: 'computer-networks', name: 'Computer Networks', credits: 3, coords: { x: 900, y: 175 } },
  ];

  const seCourses: any[] = [];
  for (const course of seCourseSlugs) {
    const existing = await prisma.cOURSE_NODES.findFirst({
      where: { roadmap_id: se.id, slug: course.slug },
    });

    if (existing) {
      seCourses.push(existing);
    } else {
      const created = await prisma.cOURSE_NODES.create({
        data: {
          roadmap_id: se.id,
          slug: course.slug,
          name: course.name,
          credits: course.credits,
          description: `Learn ${course.name} concepts and practical applications.`,
          coords: course.coords,
        },
      });
      seCourses.push(created);
    }
  }

  console.log(`  ✅ ${seCourses.length} course nodes seeded for SE`);

  // ─── Course Prerequisites (SE) ───────────────────────────────────────────────

  const prereqs = [
    { courseSlug: 'data-structures', prereqSlug: 'intro-programming' },
    { courseSlug: 'oop', prereqSlug: 'intro-programming' },
    { courseSlug: 'database-systems', prereqSlug: 'data-structures' },
    { courseSlug: 'web-development', prereqSlug: 'oop' },
    { courseSlug: 'software-engineering-fundamentals', prereqSlug: 'database-systems' },
    { courseSlug: 'software-engineering-fundamentals', prereqSlug: 'web-development' },
    { courseSlug: 'computer-networks', prereqSlug: 'operating-systems' },
  ];

  let prereqCount = 0;
  for (const pr of prereqs) {
    const course = seCourses.find((c) => c.slug === pr.courseSlug);
    const prereq = seCourses.find((c) => c.slug === pr.prereqSlug);

    if (course && prereq) {
      const existing = await prisma.cOURSE_NODE_PREREQUISITES.findFirst({
        where: {
          course_node_id: course.id,
          prerequisite_node_id: prereq.id,
        },
      });

      if (!existing) {
        await prisma.cOURSE_NODE_PREREQUISITES.create({
          data: {
            course_node_id: course.id,
            prerequisite_node_id: prereq.id,
          },
        });
        prereqCount++;
      }
    }
  }

  console.log(`  ✅ ${prereqCount} prerequisite edges seeded`);

  // ─── Course Topics (for 'intro-programming') ────────────────────────────────

  const introProg = seCourses.find((c) => c.slug === 'intro-programming');
  if (introProg) {
    const topicSlugs = [
      { slug: 'variables-types', title: 'Variables & Data Types', coords: { x: 100, y: 100 } },
      { slug: 'control-flow', title: 'Control Flow (if/else, loops)', coords: { x: 300, y: 100 } },
      { slug: 'functions', title: 'Functions & Scope', coords: { x: 500, y: 100 } },
      { slug: 'arrays-strings', title: 'Arrays & Strings', coords: { x: 300, y: 250 } },
      { slug: 'file-io', title: 'File I/O', coords: { x: 500, y: 250 } },
    ];

    const topics: any[] = [];
    for (const topic of topicSlugs) {
      const existing = await prisma.cOURSE_TOPICS_NODE.findFirst({
        where: { course_node_id: introProg.id, slug: topic.slug },
      });

      if (existing) {
        topics.push(existing);
      } else {
        const created = await prisma.cOURSE_TOPICS_NODE.create({
          data: {
            course_node_id: introProg.id,
            slug: topic.slug,
            title: topic.title,
            description: `Learn about ${topic.title}`,
            learning_objectives: `Understand and apply ${topic.title} in programming`,
            coords: topic.coords,
          },
        });
        topics.push(created);
      }
    }

    console.log(`  ✅ ${topics.length} topic nodes seeded for intro-programming`);

    // Topic edges
    const topicEdges = [
      { from: 'variables-types', to: 'control-flow' },
      { from: 'control-flow', to: 'functions' },
      { from: 'control-flow', to: 'arrays-strings' },
      { from: 'arrays-strings', to: 'file-io' },
      { from: 'functions', to: 'file-io' },
    ];

    let topicEdgeCount = 0;
    for (const edge of topicEdges) {
      const source = topics.find((t) => t.slug === edge.from);
      const target = topics.find((t) => t.slug === edge.to);

      if (source && target) {
        const existing = await prisma.cOURSE_TOPICS_EDGE.findFirst({
          where: { source_topic_id: source.id, target_topic_id: target.id },
        });

        if (!existing) {
          await prisma.cOURSE_TOPICS_EDGE.create({
            data: {
              source_topic_id: source.id,
              target_topic_id: target.id,
            },
          });
          topicEdgeCount++;
        }
      }
    }

    console.log(`  ✅ ${topicEdgeCount} topic edges seeded`);
  }

  // ─── CS Course Nodes ─────────────────────────────────────────────────────────

  const csCourseSlugs = [
    { slug: 'discrete-math', name: 'Discrete Mathematics', credits: 3, coords: { x: 100, y: 100 } },
    { slug: 'linear-algebra', name: 'Linear Algebra', credits: 3, coords: { x: 100, y: 250 } },
    { slug: 'algorithms', name: 'Algorithms', credits: 4, coords: { x: 300, y: 100 } },
    { slug: 'machine-learning', name: 'Machine Learning', credits: 4, coords: { x: 500, y: 175 } },
  ];

  let csCount = 0;
  for (const course of csCourseSlugs) {
    const existing = await prisma.cOURSE_NODES.findFirst({
      where: { roadmap_id: cs.id, slug: course.slug },
    });

    if (!existing) {
      await prisma.cOURSE_NODES.create({
        data: {
          roadmap_id: cs.id,
          slug: course.slug,
          name: course.name,
          credits: course.credits,
          description: `Comprehensive course on ${course.name}.`,
          coords: course.coords,
        },
      });
      csCount++;
    }
  }

  console.log(`  ✅ ${csCount} course nodes seeded for CS`);

  console.log('\n🎉 Seed completed successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
