import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const registrations = await prisma.registration.findMany({
      where: { userId: userPayload.userId },
      include: {
        event: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { registeredAt: 'desc' },
    });

    const formatted = registrations.map((r) => ({
      registrationId: r.id,
      qrToken: r.qrToken,
      registeredAt: r.registeredAt,
      userName: r.user.name,
      userEmail: r.user.email,
      eventId: r.event.id,
      eventTitle: r.event.title,
      eventDate: r.event.date,
      eventTime: r.event.time,
      eventVenue: r.event.venue,
      eventCategory: r.event.category,
      eventImage: r.event.image,
    }));

    return NextResponse.json({ registrations: formatted });
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
