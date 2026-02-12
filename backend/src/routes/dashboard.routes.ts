import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest, agentMiddleware, adminMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Agent Dashboard Stats
router.get('/agent', authMiddleware, agentMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const agentId = req.userId!;

    const [
      totalProperties,
      totalViews,
      totalInquiries,
      totalBookings,
      recentProperties,
      recentInquiries
    ] = await Promise.all([
      prisma.property.count({ where: { agentId } }),
      prisma.propertyView.count({
        where: {
          property: { agentId }
        }
      }),
      prisma.inquiry.count({
        where: {
          property: { agentId }
        }
      }),
      prisma.booking.count({
        where: {
          property: { agentId }
        }
      }),
      prisma.property.findMany({
        where: { agentId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { views: true, inquiries: true } } }
      }),
      prisma.inquiry.findMany({
        where: { property: { agentId } },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          property: { select: { title: true } }
        }
      })
    ]);

    res.json({
      stats: {
        totalProperties,
        totalViews,
        totalInquiries,
        totalBookings
      },
      recentProperties,
      recentInquiries
    });
  } catch (error) {
    console.error('Agent dashboard error:', error);
    res.status(500).json({ error: 'Failed to get agent dashboard data' });
  }
});

// Admin Dashboard Stats
router.get('/admin', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const [
      totalUsers,
      totalAgents,
      totalProperties,
      totalInquiries,
      totalBookings,
      totalRevenue
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.user.count({ where: { role: 'AGENT' } }),
      prisma.property.count(),
      prisma.inquiry.count(),
      prisma.booking.count(),
      prisma.transaction.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true }
      })
    ]);

    res.json({
      stats: {
        totalUsers,
        totalAgents,
        totalProperties,
        totalInquiries,
        totalBookings,
        totalRevenue: totalRevenue._sum.amount || 0
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Failed to get admin dashboard data' });
  }
});

export default router;
