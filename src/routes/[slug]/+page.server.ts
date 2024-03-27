import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { processSinglePage } from './utils';

export const load: PageServerLoad = async (context) => {
  const { params } = context;
  let data;
  try {
    data = (await import(`../../content/projects/project-${params.slug}.json`)).default;
  } catch (e) {
    error(404, {
      code: 404,
      message: 'Not found',
    });
  }
  return processSinglePage(data, `/${params.slug}`, context);
}