import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const suit = z.enum(['bolt', 'moon', 'crystal', 'leaf']).default('bolt');

/** Files live at <collection>/<lang>/<slug>.md — the folder is the language. */
const md = (dir: string) => glob({ pattern: '**/*.md', base: `./src/content/${dir}` });

const work = defineCollection({
  loader: md('work'),
  schema: z.object({
    title: z.string(),
    question: z.string(),
    year: z.string(),
    tags: z.array(z.string()).default([]),
    suit,
    link: z.string().optional(),
    linkLabel: z.string().optional(),
    order: z.number().default(99),
  }),
});

const research = defineCollection({
  loader: md('research'),
  schema: z.object({
    title: z.string(),
    question: z.string(),
    venue: z.string(),
    year: z.string(),
    authors: z.string().optional(),
    tags: z.array(z.string()).default([]),
    link: z.string().optional(),
    linkLabel: z.string().optional(),
    order: z.number().default(99),
  }),
});

const writing = defineCollection({
  loader: md('writing'),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    link: z.string().optional(),
    order: z.number().default(99),
  }),
});

/** Brief copy lives in `summary` (also the meta description); the markdown body is the long description. */
const products = defineCollection({
  loader: md('products'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(200),
      category: z.string(),
      image: image(),
      imageAlt: z.string(),
      /** schema.org type for the JSON-LD block */
      schema: z.enum(['Product', 'SoftwareApplication']).default('Product'),
      /** what is being sold: a hosted service, or a licence for software you run yourself */
      model: z.enum(['saas', 'license']).default('license'),
      /** shown as written, e.g. "From $49 / month". Omit for "price on request". */
      price: z.string().optional(),
      /** numeric price for the JSON-LD Offer; without it no offer is emitted */
      priceAmount: z.number().optional(),
      currency: z.string().default('USD'),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      order: z.number().default(99),
    }),
});

export const collections = { work, research, writing, products };
