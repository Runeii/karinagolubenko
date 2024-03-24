import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const data = (await import(`../../../content/research/research-${params.slug}.json`)).default;
  const img = await import(`../../../../static/${data.image}?enhanced`);

  return {
    ...data,
    image: img.default,
  }
};