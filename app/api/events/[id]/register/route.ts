import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: eventId } = params;
    const userPayload = getUserFromRequest(req);

    if (!userPayload) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in to register.' },
        { status: 401 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: userPayload.userId,
          eventId: event.id,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        {
          error: 'You have already registered for this event.',
          registrationId: existingRegistration.id,
          qrToken: existingRegistration.qrToken,
        },
        { status: 409 }
      );
    }

    const currentRegistrationCount = event.registrations.length;
    if (currentRegistrationCount >= event.capacity) {
      return NextResponse.json(
        { error: 'Event capacity reached. No spots currently available.' },
        { status: 409 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        userId: userPayload.userId,
        eventId: event.id,
      },
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
    });

    return NextResponse.json(
      {
        message: 'Successfully registered for event!',
        registration: {
          id: registration.id,
          qrToken: registration.qrToken,
          registeredAt: registration.registeredAt,
          eventTitle: registration.event.title,
          eventDate: registration.event.date,
          eventTime: registration.event.time,
          eventVenue: registration.event.venue,
          eventCategory: registration.event.category,
          userName: registration.user.name,
          userEmail: registration.user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'You are already registered for this event.' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to process event registration.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: eventId } = params;
    const userPayload = getUserFromRequest(req);

    if (!userPayload) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: userPayload.userId,
          eventId,
        },
      },
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { error: 'No active registration found to cancel' },
        { status: 404 }
      );
    }

    await prisma.registration.delete({
      where: {
        id: existingRegistration.id,
      },
    });

    return NextResponse.json({
      message: 'Event registration successfully cancelled',
    });
  } catch (error) {
    console.error('Unregister error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel registration' },
      { status: 500 }
    );
  }
}
