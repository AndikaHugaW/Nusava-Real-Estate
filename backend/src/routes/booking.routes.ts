import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest, agentMiddleware } from '../middleware/auth.middleware';
import { validateRequest, bookingSchema } from '../middleware/validation';


const router = Router();

// Create a booking request
router.post('/', authMiddleware, validateRequest(bookingSchema), async (req: AuthRequest, res: Response) => {
  try {

    const { propertyId, bookingDate, message } = req.body;

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId }
    });

    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    const booking = await prisma.booking.create({
      data: {
        propertyId,
        userId: req.userId!,
        bookingDate: new Date(bookingDate),
        message,
        status: 'PENDING'
      },
      include: {
        property: {
          select: { id: true, title: true, address: true }
        }
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user's bookings
router.get('/my', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.userId },
      include: {
        property: {
          include: { images: { take: 1 } }
        }
      },
      orderBy: { bookingDate: 'asc' }
    });

    res.json(bookings);
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// Get bookings for agent's properties
router.get('/received', authMiddleware, agentMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          agentId: req.userId
        }
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true }
        },
        property: {
          select: { id: true, title: true }
        }
      },
      orderBy: { bookingDate: 'asc' }
    });

    res.json(bookings);
  } catch (error) {
    console.error('Get received bookings error:', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// Update booking status (Agent only)
router.patch('/:id/status', authMiddleware, agentMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { property: true }
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    // Check if the agent owns the property
    if (booking.property.agentId !== req.userId && req.userRole !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized to update this booking' });
      return;
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    res.json(updatedBooking);
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

export default router;
