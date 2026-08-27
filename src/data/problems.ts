export const problems = [
  {
    slug: 'picky-eating',
    name: 'Picky Eating',
    question: 'Has every meal started to feel like a negotiation?',
    intro: 'Find tools and reading for making food routines easier to see and understand, without pressure or promises about what a child will eat.',
  },
  {
    slug: 'big-emotions',
    name: 'Big Emotions',
    question: 'Do feelings take over before anyone can find the words?',
    intro: 'Find visual support for naming feelings, making a simple choice and moving through a hard moment together.',
  },
  {
    slug: 'potty-learning',
    name: 'Potty Learning',
    question: 'Would a clear picture of each step help?',
    intro: 'Find tools that show the routine clearly while keeping shame, pressure and perfect timelines out of the picture.',
  },
  {
    slug: 'routines-independence',
    name: 'Routines and Independence',
    question: 'Is the hardest part getting from one step to the next?',
    intro: 'Find visual routines for mornings, evenings, handovers and everyday tasks a toddler is learning to do.',
  },
  {
    slug: 'communication',
    name: 'Communication',
    question: 'Would it help to point to the need before saying it?',
    intro: 'Find simple choices and visual prompts for everyday needs, words and shared understanding.',
  },
  {
    slug: 'play-preschool-readiness',
    name: 'Play and Preschool Readiness',
    question: 'Are you looking for useful play without a complicated setup?',
    intro: 'Find simple activities that give children room to practise through play, without turning home into a classroom.',
  },
] as const;

export type ProblemSlug = (typeof problems)[number]['slug'];

export function getProblem(slug: string) {
  return problems.find((problem) => problem.slug === slug);
}
