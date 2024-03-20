import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { AUTHENTICATED_TOKEN } from '$env/static/private'

// This is not fort knox, but it's good enough for our purposes.
export const actions = {
  authenticate: async ({ cookies, request }) => {
    const data = await request.formData();
    const password = data.get('password');
    const slug = data.get('slug') as string ?? '/'

    if (password !== 'testpass') {
      return fail(400, {
        incorrect: true,
        slug
      });
    }


    cookies.set('authentication-hash', btoa(AUTHENTICATED_TOKEN), { path: '/' });

    redirect(302, slug);

  },
} satisfies Actions;