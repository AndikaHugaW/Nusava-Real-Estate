import { z } from 'zod';

export const propertySchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(20),
  price: z.number().positive(),
  type: z.enum(['HOUSE', 'APARTMENT', 'VILLA', 'LAND', 'COMMERCIAL']),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(3),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  area: z.number().positive(),
  yearBuilt: z.number().int().optional(),
  features: z.array(z.string()).optional(),
  images: z.array(z.object({
    url: z.string(),
    isPrimary: z.boolean().optional()
  })).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SOLD', 'RENTED', 'PENDING', 'ARCHIVED']).optional(),
  isFeatured: z.boolean().optional(),
  roiEstimation: z.number().optional(),
  rentalYield: z.number().optional(),
  areaGrowth: z.number().optional(),
  nearbyPlaces: z.record(z.string(), z.any()).optional()
});

export const inquirySchema = z.object({
  propertyId: z.string().uuid(),
  message: z.string().min(10).max(500)
});

export const bookingSchema = z.object({
  propertyId: z.string().uuid(),
  bookingDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  }),
  message: z.string().max(500).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  phone: z.string().optional(),
  role: z.enum(['USER', 'AGENT', 'ADMIN']).optional()
});

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({ error: error.errors || 'Validation failed' });
    }
  };
};

