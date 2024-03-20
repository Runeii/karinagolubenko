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

  return {
    ...data,
  };
};