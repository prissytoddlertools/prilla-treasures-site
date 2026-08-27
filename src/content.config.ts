import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const problem = z.enum([
  'picky-eating',
  'big-emotions',
  'potty-learning',
  'routines-independence',
  'communication',
  'play-preschool-readiness',
]);

const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    problem,
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false),
    priceLabel: z.string().optional(),
    checkoutUrl: z.string().optional(),
    previewImages: z.array(z.string()).default([]),
    included: z.array(z.string()),
    steps: z.array(z.string()),
    limitations: z.array(z.string()),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
  }),
});

const resources = defineCollection({
  loader: glob({ base: './src/content/resources', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    problem,
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { products, resources };
