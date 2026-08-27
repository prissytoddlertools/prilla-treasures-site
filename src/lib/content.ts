import { getCollection } from 'astro:content';

export async function getPublishedProducts() {
  const products = await getCollection(
    'products',
    ({ data }) => !data.draft && Boolean(data.checkoutUrl) && Boolean(data.priceLabel),
  );
  return products.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export async function getPublishedResources() {
  const resources = await getCollection('resources', ({ data }) => !data.draft);
  return resources.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}
