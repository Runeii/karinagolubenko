import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
  const research = await import.meta.glob('../../content/research/*.json');
  const data = await Promise.all(Object.keys(research).map(async (project) => {
    const slug = project.split('/').pop()?.split('.').shift() ?? '';

    const module = (await import(`../../content/research/${slug}.json`)).default;
    const prettySlug = `/research/${slug.replace('research-', '')}`;

    return {
      ...module,
      slug: prettySlug,
    }
  }));

  return {
    research: data,
  };
};