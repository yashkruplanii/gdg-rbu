import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload || userPayload.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized: Admin privileges required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    const where: any = {};
    if (eventId) {
      where.eventId = eventId;
    }

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        event: true,
      },
      orderBy: { registeredAt: 'desc' },
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching admin registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
