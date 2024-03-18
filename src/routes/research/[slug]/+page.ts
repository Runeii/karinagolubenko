import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const data = await import(`../../../content/research/research-${params.slug}.json`);

  return {
    ...data,
  };
};