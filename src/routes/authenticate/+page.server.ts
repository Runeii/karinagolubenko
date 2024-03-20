import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { PASSWORD } from '$env/static/private'
import { hashString } from '../../utils';

// This is not fort knox, but it's good enough for our purposes.
export const actions = {
  authenticate: async ({ cookies, request }) => {
    const data = await request.formData();
    const password = data.get('password');
    const slug = data.get('slug') as string ?? '/'

    const isPasswordValid = password === PASSWORD

    if (!isPasswordValid) {
      return fail(400, {
        incorrect: true,
        slug
      });
    }


    cookies.set('authentication-hash', hashString(password), { path: '/' });

    redirect(302, slug);

  },
} satisfies Actions;