import { error } from '@sveltejs/kit';
import { processSinglePage } from '../../[slug]/utils';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async (context) => {
  const { params } = context;
  let data;
  try {
    data = (await import(`../../../content/research/research-${params.slug}.json`)).default;

  } catch (e) {
    error(404, {
      code: 404,
      message: 'Not found',
    });
  }
  return processSinglePage(data, context);
}
