import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import { validateRequest, inquirySchema } from '../middleware/validation';

const router = Router();

// Create inquiry
router.post('/', authMiddleware, validateRequest(inquirySchema), async (req: AuthRequest, res: Response) => {
  try {

    const { propertyId, message } = req.body;

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId }
    });

    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        message,
        userId: req.userId!,
        propertyId
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true }
        },
        property: {
          select: { id: true, title: true }
        }
      }
    });

    res.status(201).json(inquiry);
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
});

// Get user's inquiries
router.get('/my', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      where: { userId: req.userId },
      include: {
        property: {
          select: { id: true, title: true, images: { take: 1 } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(inquiries);
  } catch (error) {
    console.error('Get my inquiries error:', error);
    res.status(500).json({ error: 'Failed to get inquiries' });
  }
});

// Get inquiries for agent's properties
router.get('/received', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
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
      orderBy: { createdAt: 'desc' }
    });

    res.json(inquiries);
  } catch (error) {
    console.error('Get received inquiries error:', error);
    res.status(500).json({ error: 'Failed to get inquiries' });
  }
});

// Update inquiry status
router.patch('/:id/status', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: { property: true }
    });

    if (!inquiry) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }

    if (inquiry.property.agentId !== req.userId) {
      res.status(403).json({ error: 'Not authorized to update this inquiry' });
      return;
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: { status }
    });

    res.json(updatedInquiry);
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// Reply to inquiry (Agent only)
router.post('/:id/reply', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { response } = req.body;

    if (!response) {
      res.status(400).json({ error: 'Response message is required' });
      return;
    }

    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: { property: true }
    });

    if (!inquiry) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }

    // Verify if current user is the agent of the property
    if (inquiry.property.agentId !== req.userId && req.userRole !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized to reply to this inquiry' });
      return;
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        agentResponse: response,
        respondedAt: new Date(),
        status: 'RESPONDED'
      },
      include: {
        user: { select: { name: true, email: true } },
        property: { select: { title: true } }
      }
    });

    res.json(updatedInquiry);
  } catch (error) {
    console.error('Reply inquiry error:', error);
    res.status(500).json({ error: 'Failed to send reply' });
  }
});

export default router;
