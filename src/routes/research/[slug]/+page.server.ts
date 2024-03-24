import { parseMediaBlock } from '../../../utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const data = (await import(`../../../content/research/research-${params.slug}.json`)).default;

  return {
    ...data,
    featuredMedia: await parseMediaBlock(data.featuredMedia, fetch),
  }
};