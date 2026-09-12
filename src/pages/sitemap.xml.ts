import type { APIRoute } from 'astro';
import { problems } from '../data/problems';
import { getPublishedProducts, getPublishedResources } from '../lib/content';

const fixedRoutes = [
  '/',
  '/start-here/',
  '/shop/',
  '/problems/',
  '/free-tools/',
  '/resources/',
  '/about/',
  '/faq-contact/',
  '/policies/privacy/',
  '/policies/terms/',
  '/policies/digital-products/',
];

export const GET: APIRoute = async () => {
  const products = await getPublishedProducts();
  const resources = await getPublishedResources();
  const paths = [
    ...fixedRoutes,
    ...problems.map((problem) => `/problems/${problem.slug}/`),
    ...products.map((product) => `/shop/${product.data.slug}/`),
    ...resources.filter((resource) => !resource.data.noindex).map((resource) => `/resources/${resource.data.slug}/`),
  ];

  const urls = paths
    .map((path) => `<url><loc>${new URL(path, 'https://prillatreasures.com').href}</loc></url>`)
    .join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
