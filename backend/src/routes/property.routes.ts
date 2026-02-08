import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, agentMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Get all properties (public)
router.get('/', async (req, res) => {
  try {
    const { 
      type, 
      status, 
      city, 
      minPrice, 
      maxPrice, 
      bedrooms, 
      bathrooms,
      page = '1',
      limit = '10'
    } = req.query;

    const where: any = {};
    
    if (type) where.type = type;
    if (status) where.status = status;
    if (city) where.city = { contains: city as string, mode: 'insensitive' };
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }
    if (bedrooms) where.bedrooms = { gte: parseInt(bedrooms as string) };
    if (bathrooms) where.bathrooms = { gte: parseInt(bathrooms as string) };

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: true,
          agent: {
            select: { id: true, name: true, email: true, phone: true }
          }
        },
        skip,
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.property.count({ where })
    ]);

    res.json({
      properties,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ error: 'Failed to get properties' });
  }
});

// Get single property (public)
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id as string;
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        images: true,
        agent: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });

    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    res.json(property);
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ error: 'Failed to get property' });
  }
});

// Create property (agent/admin only)
router.post('/', authMiddleware, agentMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      price,
      type,
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      bedrooms,
      bathrooms,
      area,
      yearBuilt,
      features,
      images
    } = req.body;

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price,
        type,
        address,
        city,
        state,
        zipCode,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        area,
        yearBuilt,
        features,
        agentId: req.userId!,
        images: {
          create: images?.map((img: { url: string; isPrimary?: boolean }) => ({
            url: img.url,
            isPrimary: img.isPrimary || false
          })) || []
        }
      },
      include: {
        images: true,
        agent: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });

    res.status(201).json(property);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// Update property (owner agent/admin only)
router.put('/:id', authMiddleware, agentMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    
    // Check ownership
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    });

    if (!existingProperty) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    if (existingProperty.agentId !== req.userId && req.userRole !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized to update this property' });
      return;
    }

    const property = await prisma.property.update({
      where: { id },
      data: req.body,
      include: {
        images: true,
        agent: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });

    res.json(property);
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});

// Delete property (owner agent/admin only)
router.delete('/:id', authMiddleware, agentMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    });

    if (!existingProperty) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    if (existingProperty.agentId !== req.userId && req.userRole !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized to delete this property' });
      return;
    }

    await prisma.property.delete({ where: { id } });

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

export default router;
