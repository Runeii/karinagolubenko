import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const data = await import(`../../../content/projects/project-${params.slug}.json`);

  return {
    ...data,
  };
};