import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const userPayload = getUserFromRequest(req);

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const isRegistered = userPayload
      ? event.registrations.some((r) => r.userId === userPayload.userId)
      : false;

    const userRegistration = userPayload
      ? event.registrations.find((r) => r.userId === userPayload.userId)
      : null;

    return NextResponse.json({
      event: {
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
        qrToken: userRegistration?.qrToken || null,
        registrationId: userRegistration?.id || null,
      },
    });
  } catch (error) {
    console.error('Error fetching event details:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload || userPayload.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Admin privileges required' },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await req.json();
    const { title, description, date, time, venue, capacity, category, image, featured } = body;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title: title?.trim(),
        description: description?.trim(),
        date,
        time,
        venue: venue?.trim(),
        capacity: capacity ? Number(capacity) : undefined,
        category,
        image,
        featured: typeof featured === 'boolean' ? featured : undefined,
      },
    });

    return NextResponse.json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload || userPayload.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Admin privileges required' },
        { status: 403 }
      );
    }

    const { id } = params;
    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
