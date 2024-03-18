import type { PageLoad } from './$types';
import content from '../content/homepage.json';

export const load: PageLoad = async () => {
  const projects = await import.meta.glob('../content/projects/*.json');

  const data = await Promise.all(Object.keys(projects).map(async (project) => {
    const slug = project.split('/').pop()?.split('.').shift() ?? '';

    const module = await import(`../content/projects/${slug}.json`);

    const prettySlug = `/${slug.replace('project-', '')}`

    return {
      ...module,
      default: undefined,
      slug: prettySlug,
    }
  }));

  return {
    content,
    projects: data,
  };
};