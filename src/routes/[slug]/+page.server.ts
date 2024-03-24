import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { PASSWORD } from '$env/static/private'
import { hashString, parseMediaBlock } from '../../utils';

export const load: PageServerLoad = async ({ cookies, fetch, params }) => {
  let data;
  try {
    data = (await import(`../../content/projects/project-${params.slug}.json`)).default;
  } catch (e) {
    error(404, {
      code: 404,
      message: 'Not found',
    });
  }

  const token = cookies.get('authentication-hash') ?? '';
  const isAuthenticated = token === hashString(PASSWORD);

  if (data.isPrivate && !isAuthenticated) {
    redirect(302, `/authenticate?slug=${params.slug}`);
    return;
  }

  const blocks = await Promise.all(data.blocks.map(async (block) => {
    const visuals = await Promise.all(block.visuals.map(async (visual) => {

      const media = await parseMediaBlock(visual.media, fetch)
      return {
        ...visual,
        media,
      };
    }));

    return {
      ...block,
      visuals: visuals.filter(value => value && value.media),
    };
  }));

  return {
    ...data,
    blocks,
    featuredMedia: await parseMediaBlock(data.featuredMedia, fetch)
  };
};