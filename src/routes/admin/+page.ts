import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  redirect(302, 'https://app.pagescms.org/Runeii/karinagolubenko/main/content');
};