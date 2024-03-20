import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { AUTHENTICATED_TOKEN, PASSWORD } from '$env/static/private'
import { hashString } from '../../utils';

export const load: PageServerLoad = async ({ cookies, params }) => {
  const data = (await import(`../../content/projects/project-${params.slug}.json`)).default;

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