import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const featuredOnly = searchParams.get('featured') === 'true';

    const userPayload = getUserFromRequest(req);

    const where: any = {};

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { description: { contains: query } },
        { venue: { contains: query } },
      ];
    }

    if (category && category !== 'All') {
      where.category = category;
    }

    if (featuredOnly) {
      where.featured = true;
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        registrations: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    const formattedEvents = events.map((event) => {
      const isRegistered = userPayload
        ? event.registrations.some((r) => r.userId === userPayload.userId)
        : false;

      return {
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        venue: event.venue,
        capacity: event.capacity,
        category: event.category,
        image: event.image,
        featured: event.featured,
        registrationCount: event.registrations.length,
        isRegistered,
      };
    });

    return NextResponse.json({ events: formattedEvents });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload || userPayload.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Admin privileges required' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, description, date, time, venue, capacity, category, image, featured } = body;

    if (!title || !description || !date || !time || !venue) {
      return NextResponse.json(
        { error: 'Missing required event fields' },
        { status: 400 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        date,
        time,
        venue: venue.trim(),
        capacity: Number(capacity) || 100,
        category: category || 'Workshop',
        image: image || null,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(
      { message: 'Event created successfully', event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
