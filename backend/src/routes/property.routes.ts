import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, agentMiddleware, AuthRequest } from '../middleware/auth.middleware';
import { validateRequest, propertySchema } from '../middleware/validation';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'property-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed!'));
  }
});

// Helper to generate slug
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

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
      limit = '10',
      search
    } = req.query;

    const where: any = {};
    
    if (status && status !== 'All') {
      where.status = status;
    } else if (!status) {
      where.status = { notIn: ['ARCHIVED', 'DRAFT'] };
    }
    // If status === 'All', we don't add where.status, so it returns everything
    
    if (type && type !== 'All') where.type = type;
    if (city) where.city = { contains: city as string, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { address: { contains: search as string, mode: 'insensitive' } },
      ];
    }
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
          },
          _count: {
            select: { views: true, favorites: true }
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

// Get single property
router.get('/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier);

    const property = await prisma.property.findUnique({
      where: isUuid ? { id: identifier } : { slug: identifier },
      include: {
        images: true,
        agent: {
          select: { id: true, name: true, email: true, phone: true }
        },
        _count: {
          select: { views: true, favorites: true }
        }
      }
    });

    if (!property) return res.status(404).json({ error: 'Property not found' });

    // Background view increment
    prisma.propertyView.create({
      data: { propertyId: property.id, ipAddress: req.ip, userAgent: req.get('User-Agent') }
    }).catch(e => console.error(e));

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

// Upload images endpoint
router.post('/upload', authMiddleware, agentMiddleware, upload.array('images', 10), (req: any, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const imageUrls = files.map(file => ({
      url: `/uploads/${file.filename}`,
      isPrimary: false
    }));
    res.json({ images: imageUrls });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Create property with images
router.post('/', authMiddleware, agentMiddleware, upload.array('images', 10), async (req: AuthRequest, res: Response) => {
  try {
    const files = (req as any).files as Express.Multer.File[];
    const body = req.body;

    const {
      title, description, price, type, address, city, state, zipCode,
      latitude, longitude, bedrooms, bathrooms, area, yearBuilt,
      status, roiEstimation, rentalYield, areaGrowth
    } = body;

    const features = typeof body.features === 'string' ? JSON.parse(body.features) : body.features;
    const nearbyPlaces = typeof body.nearbyPlaces === 'string' ? JSON.parse(body.nearbyPlaces) : body.nearbyPlaces;

    let slug = generateSlug(title);
    const existing = await prisma.property.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;

    const property = await prisma.property.create({
      data: {
        title, 
        description, 
        price: parseFloat(price.toString()), 
        type: type as any, 
        address, 
        city, 
        state, 
        zipCode: zipCode.toString(),
        latitude: latitude ? parseFloat(latitude.toString()) : null,
        longitude: longitude ? parseFloat(longitude.toString()) : null,
        bedrooms: parseInt(bedrooms.toString()),
        bathrooms: parseInt(bathrooms.toString()),
        area: parseFloat(area.toString()),
        yearBuilt: yearBuilt ? parseInt(yearBuilt.toString()) : null,
        features: features || [],
        status: (status as any) || 'DRAFT',
        slug,
        agentId: req.userId!,
        roiEstimation: roiEstimation ? parseFloat(roiEstimation.toString()) : null,
        rentalYield: rentalYield ? parseFloat(rentalYield.toString()) : null,
        areaGrowth: areaGrowth ? parseFloat(areaGrowth.toString()) : null,
        nearbyPlaces: nearbyPlaces || {},
        images: {
          create: (files as any[])?.map((file: any, index: number) => ({
            url: `/uploads/${file.filename}`,
            isPrimary: index === 0
          })) || []
        }
      } as any,
      include: { images: true }
    });

    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create' });
  }
});

// Update property
router.put('/:id', authMiddleware, agentMiddleware, upload.array('images', 10), async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;
    const files = (req as any).files as Express.Multer.File[];
    
    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    // Removed ownership check to allow all Agents/Admins to manage any property

    const body = req.body;
    const { title, status, ...rest } = body;
    
    const updateData: any = { ...rest };
    if (body.price) updateData.price = parseFloat(body.price);
    if (body.bedrooms) updateData.bedrooms = parseInt(body.bedrooms);
    if (body.bathrooms) updateData.bathrooms = parseInt(body.bathrooms);
    if (body.area) updateData.area = parseFloat(body.area);
    if (body.features) updateData.features = typeof body.features === 'string' ? JSON.parse(body.features) : body.features;
    if (body.nearbyPlaces) updateData.nearbyPlaces = typeof body.nearbyPlaces === 'string' ? JSON.parse(body.nearbyPlaces) : body.nearbyPlaces;

    if (title && title !== existing.title) {
      let slug = generateSlug(title);
      const existingSlug = await prisma.property.findUnique({ where: { slug } });
      if (existingSlug && existingSlug.id !== id) slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
      updateData.title = title;
      updateData.slug = slug;
    }

    if (files && files.length > 0) {
      await prisma.propertyImage.deleteMany({ where: { propertyId: id } });
      updateData.images = {
        create: files.map((file, index) => ({
          url: `/uploads/${file.filename}`,
          isPrimary: index === 0
        }))
      };
    }

    const updated = await prisma.property.update({
      where: { id },
      data: {
        ...updateData,
        roiEstimation: body.roiEstimation ? parseFloat(body.roiEstimation.toString()) : undefined,
        rentalYield: body.rentalYield ? parseFloat(body.rentalYield.toString()) : undefined,
        areaGrowth: body.areaGrowth ? parseFloat(body.areaGrowth.toString()) : undefined,
      } as any,
      include: { images: true }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed update' });
  }
});

// Soft delete
router.delete('/:id', authMiddleware, agentMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;
    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Not found' });
    // Removed ownership check to allow all Agents/Admins to manage any property

    await prisma.property.update({ where: { id }, data: { status: 'ARCHIVED' } });
    res.json({ message: 'Archived' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
