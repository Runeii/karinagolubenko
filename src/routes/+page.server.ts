import type { PageServerLoad } from './$types';
import content from '../content/homepage.json';
import { parseMediaBlock } from '../utils';

export const load: PageServerLoad = async ({ fetch }) => {
  const projects = await import.meta.glob('../content/projects/*.json');

  const data = await Promise.all(Object.keys(projects).map(async (project) => {
    const slug = project.split('/').pop()?.split('.').shift() ?? '';

    const module = (await import(`../content/projects/${slug}.json`)).default;

    const prettySlug = `/${slug.replace('project-', '')}`

    const featuredMedia = module.isPrivate ? `/image?hash=${btoa(module.featuredMedia?.image)}` : parseMediaBlock(module.featuredMedia, fetch);

    return {
      ...module,
      featuredMedia,
      default: undefined,
      slug: prettySlug,
    }
  }));

  return {
    content,
    projects: data,
  };
};