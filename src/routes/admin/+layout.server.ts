import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
  redirect(302, 'https://app.pagescms.org/Runeii/karinagolubenko/main/content');
};