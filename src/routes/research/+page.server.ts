import type { PageServerLoad } from '../$types';
import { parseMediaBlock } from '../../utils';

export const load: PageServerLoad = async ({ fetch }) => {
  const research = await import.meta.glob('../../content/research/*.json');
  const data = await Promise.all(Object.keys(research).map(async (project) => {
    const slug = project.split('/').pop()?.split('.').shift() ?? '';

    const module = (await import(`../../content/research/${slug}.json`)).default;
    const prettySlug = `/research/${slug.replace('research-', '')}`;

    return {
      ...module,
      featuredMedia: await parseMediaBlock(module.featuredMedia, fetch),
      slug: prettySlug,
    }
  }));

  return {
    research: data,
  };
};