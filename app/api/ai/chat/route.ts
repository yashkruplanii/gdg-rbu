import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = (body.message || '').trim().toLowerCase();

    if (!message) {
      return NextResponse.json({ reply: 'How can I assist you with GDG events today?' });
    }

    const events = await prisma.event.findMany({
      include: {
        registrations: { select: { id: true } },
      },
      orderBy: { date: 'asc' },
    });

    let matchedEvents = events;
    let reply = '';

    if (message.includes('workshop') || message.includes('learn') || message.includes('hands on')) {
      matchedEvents = events.filter((e) => e.category.toLowerCase().includes('workshop'));
      reply = `We have ${matchedEvents.length} workshop(s) lined up! Here are the details:`;
    } else if (message.includes('hackathon') || message.includes('compete') || message.includes('prize')) {
      matchedEvents = events.filter((e) => e.category.toLowerCase().includes('hackathon'));
      reply = `Get your team ready! Here is the hackathon info:`;
    } else if (message.includes('ai') || message.includes('machine learning') || message.includes('gemini')) {
      matchedEvents = events.filter((e) => e.category.toLowerCase().includes('ai') || e.title.toLowerCase().includes('ai'));
      reply = `Here are the AI & Machine Learning sessions scheduled with GDG RBU:`;
    } else if (message.includes('how to register') || message.includes('register') || message.includes('ticket') || message.includes('qr')) {
      return NextResponse.json({
        reply: `🎟️ **How to register:**\n1. Sign up or log into your GDG account.\n2. Pick any event from the **Events** page.\n3. Click **"Register Now"**.\n4. Your instant **QR Ticket Pass** will be generated and saved in your **Dashboard**!`,
        recommendations: events.slice(0, 2).map((e) => ({
          id: e.id,
          title: e.title,
          category: e.category,
          date: e.date,
        })),
      });
    } else if (message.includes('what is gdg') || message.includes('about') || message.includes('gdg rbu')) {
      return NextResponse.json({
        reply: `🚀 **Google Developer Groups (GDG) on Campus - RBU** is a student community dedicated to bridging the gap between theory and industry-grade tech.\n\nWe host regular workshops on Web, Cloud, AI/ML, and Mobile development, alongside university hackathons and speaker sessions!`,
      });
    } else {
      matchedEvents = events.slice(0, 3);
      reply = `Here are some popular upcoming events you might like:`;
    }

    const recommendations = matchedEvents.map((e) => ({
      id: e.id,
      title: e.title,
      category: e.category,
      date: e.date,
    }));

    return NextResponse.json({
      reply: reply || `Here are the top events happening at GDG RBU:`,
      recommendations,
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json({
      reply: "I'm having trouble retrieving event data right now. Please explore the Events page directly!",
      recommendations: [],
    });
  }
}
