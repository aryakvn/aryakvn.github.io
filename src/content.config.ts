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

export const collections = { work, research, writing };
