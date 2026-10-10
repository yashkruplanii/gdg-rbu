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

    const totalUsers = await prisma.user.count();
    const totalEvents = await prisma.event.count();
    const totalRegistrations = await prisma.registration.count();

    const events = await prisma.event.findMany({
      include: {
        registrations: {
          select: { id: true },
        },
      },
      orderBy: { date: 'asc' },
    });

    const totalCapacity = events.reduce((acc, ev) => acc + ev.capacity, 0);
    const overallOccupancyRate =
      totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;

    const eventStats = events.map((ev) => ({
      id: ev.id,
      title: ev.title,
      category: ev.category,
      date: ev.date,
      capacity: ev.capacity,
      registrations: ev.registrations.length,
      occupancy: Math.min(100, Math.round((ev.registrations.length / ev.capacity) * 100)),
    }));

    const categoryCount: Record<string, number> = {};
    events.forEach((ev) => {
      categoryCount[ev.category] = (categoryCount[ev.category] || 0) + ev.registrations.length;
    });

    return NextResponse.json({
      summary: {
        totalUsers,
        totalEvents,
        totalRegistrations,
        totalCapacity,
        overallOccupancyRate,
      },
      eventStats,
      categoryCount,
    });
  } catch (error) {
    console.error('Error fetching admin analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
