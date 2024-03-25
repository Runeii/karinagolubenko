import type { PageServerLoad } from './$types';
import content from '../content/homepage.json';

export const load: PageServerLoad = async ({ fetch }) => {
  const projects = await import.meta.glob('../content/projects/*.json');

  const data = await Promise.all(Object.keys(projects).map(async (project) => {
    const slug = project.split('/').pop()?.split('.').shift() ?? '';

    const module = (await import(`../content/projects/${slug}.json`)).default;

    const prettySlug = `/${slug.replace('project-', '')}`

    //const featuredMedia = module.isPrivate ? `/image?hash=${btoa(module.featuredMedia?.image)}` : await parseMediaBlock(module.featuredMedia, fetch);
    const featuredMedia = `/image?hash=${btoa(module.featuredMedia?.image)}`;

    return {
      ...module,
      featuredMedia,
      isPrivate: true,
      default: undefined,
      slug: prettySlug,
    }
  }));

  return {
    content,
    projects: data,
  };
};