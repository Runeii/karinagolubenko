import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const research = await import.meta.glob('../../content/research/*.json');
  const data = await Promise.all(Object.keys(research).map(async (project) => {
    const slug = project.split('/').pop()?.split('.').shift() ?? '';

    const module = await import(`../../content/research/${slug}.json`);
    const prettySlug = `/research/${slug.replace('research-', '')}`;

    return {
      ...module,
      default: undefined,
      slug: prettySlug,
    }
  }));

  return {
    research: data,
  };
};