import type { PageServerLoad } from './$types';
import content from '../content/homepage.json';

export const load: PageServerLoad = async () => {
  const projects = await import.meta.glob('../content/projects/*.json');

  const data = await Promise.all(Object.keys(projects).map(async (project) => {
    const slug = project.split('/').pop()?.split('.').shift() ?? '';

    const module = (await import(`../content/projects/${slug}.json`)).default;

    const prettySlug = `/${slug.replace('project-', '')}`

    const image = module.isPrivate ? `/image?hash=${btoa(module.image)}` : module.image;

    return {
      ...module,
      image,
      default: undefined,
      slug: prettySlug,
    }
  }));

  return {
    content,
    projects: data,
  };
};