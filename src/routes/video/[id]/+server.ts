import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { BUNNY_LIBRARY_ID, BUNNY_API_KEY } from '$env/static/private';


export const GET: RequestHandler = async ({ params }) => {
  const data = await fetch(`https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos/${params.id}`, {
    headers: {
      accept: 'application/json',
      'AccessKey': BUNNY_API_KEY
    },
  });

  if (data.status === 404) {
    return error(404, 'Not found');
  }

  if (!data.ok) {
    return error(data.status, 'Failed to fetch video');
  }

  return data;
};

