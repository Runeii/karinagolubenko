import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { AUTHENTICATED_TOKEN } from '$env/static/private'

export const load: PageServerLoad = async ({ cookies, params }) => {
  const data = (await import(`../../content/projects/project-${params.slug}.json`)).default;

  const token = cookies.get('authentication-hash') ?? '';
  const decodedToken = atob(token);
  const isAuthenticated = decodedToken === AUTHENTICATED_TOKEN;

  if (data.isPrivate && !isAuthenticated) {
    redirect(302, `/authenticate?slug=${params.slug}`);
    return;
  }

  return {
    ...data,
  };
};