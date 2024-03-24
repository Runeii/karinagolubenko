import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { PASSWORD } from '$env/static/private'
import { hashString } from '../../utils';

export const load: PageServerLoad = async ({ cookies, params }) => {
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

  const img = await import(`../../../static/${data.image}?enhanced`);

  const blocks = await Promise.all(data.blocks.map(async (block) => {
    const images = await Promise.all(block.images.map(async (image) => {
      if (!image.image) {
        return undefined;
      }

      const img = await import(`../../../static/${image.image}?enhanced`);

      return {
        ...image,
        image: img.default,
      };
    }));
    return {
      ...block,
      images: images.filter(value => value),
    };
  }));

  return {
    ...data,
    blocks,
    image: img.default,
  };
};