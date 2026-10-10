const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for GDG RBU EventHub...');

  await prisma.registration.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.user.deleteMany({});

  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const userPasswordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'GDG Admin Lead',
      email: 'admin@gdgrbu.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });

  const member = await prisma.user.create({
    data: {
      name: 'Yash Kruplani',
      email: 'yash@rbu.edu',
      passwordHash: userPasswordHash,
      role: 'USER',
    },
  });

  const member2 = await prisma.user.create({
    data: {
      name: 'Aarav Sharma',
      email: 'aarav@rbu.edu',
      passwordHash: userPasswordHash,
      role: 'USER',
    },
  });

  const abcd = await prisma.user.create({
    data: {
      name: 'Demo Student',
      email: 'abcd@gmail.com',
      passwordHash: userPasswordHash,
      role: 'USER',
    },
  });

  console.log('✅ Created demo users: admin@gdgrbu.com, yash@rbu.edu, abcd@gmail.com');

  const event1 = await prisma.event.create({
    data: {
      title: 'GDG ORIENTATION & TECH INDUCTION 2026',
      description: 'Welcome to Google Developer Groups on Campus - RBU Chapter! Learn about our yearly roadmap, core tracks (AI/ML, Web, Cloud, Mobile), and how you can participate in hackathons, workshops, and build real-world software.',
      date: '2026-10-15',
      time: '03:00 PM',
      venue: 'Ramdeobaba University, Main Auditorium',
      capacity: 100,
      category: 'Orientation',
      featured: true,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Building AI Apps with Google Gemini & Next.js',
      description: 'Hands-on masterclass where you will build and deploy a production-ready AI application powered by the Gemini 1.5 Pro / Flash API, prompt engineering, and Next.js App Router.',
      date: '2026-10-22',
      time: '04:30 PM',
      venue: 'Computer Science Lab 3 / Online Stream',
      capacity: 60,
      category: 'AI/ML',
      featured: true,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: 'Flutter & Dart: Zero to Cross-Platform Hero',
      description: 'Master mobile app development using Flutter. Build smooth iOS & Android interfaces, implement local storage, and connect REST APIs in a 3-hour intensive workshop.',
      date: '2026-10-28',
      time: '02:00 PM',
      venue: 'RBU Innovation Center, Room 204',
      capacity: 50,
      category: 'Workshop',
      featured: false,
    },
  });

  const event4 = await prisma.event.create({
    data: {
      title: 'Hack-a-Thon 2026: Campus Code Sprint',
      description: '36 hours of non-stop innovation! Form teams of 2-4, solve real-world problems using Google Cloud & open-source technologies, and compete for ₹50,000+ in cash prizes, swags, and internship interviews.',
      date: '2026-11-05',
      time: '09:00 AM',
      venue: 'RBU Central Convention Center',
      capacity: 80,
      category: 'Hackathon',
      featured: true,
    },
  });

  const event5 = await prisma.event.create({
    data: {
      title: 'Google Cloud Platform (GCP) & Docker Crash Course',
      description: 'Learn how to containerize web services with Docker and deploy them scalably on Google Cloud Run and Google Kubernetes Engine (GKE) with CI/CD pipelines.',
      date: '2026-11-12',
      time: '05:00 PM',
      venue: 'Seminar Hall 1',
      capacity: 75,
      category: 'Tech Talk',
      featured: false,
    },
  });

  console.log('✅ Created 5 GDG events');

  await prisma.registration.create({
    data: {
      userId: member.id,
      eventId: event1.id,
      qrToken: 'GDG-PASS-ORNT-001',
    },
  });

  await prisma.registration.create({
    data: {
      userId: member.id,
      eventId: event2.id,
      qrToken: 'GDG-PASS-GEMINI-002',
    },
  });

  await prisma.registration.create({
    data: {
      userId: member2.id,
      eventId: event1.id,
      qrToken: 'GDG-PASS-ORNT-003',
    },
  });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
