import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Image, createCanvas, loadImage } from '@napi-rs/canvas';

const createPixellatedImage = async (image: Image, pixelSize = 80) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  ctx.imageSmoothingEnabled = false;

  // Calculate the reduced resolution sizes
  const scaledWidth = Math.ceil(canvas.width / pixelSize);
  const scaledHeight = Math.ceil(canvas.height / pixelSize);

  // Draw the image in reduced resolution
  ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

  // Scale the image back up to original size, causing the pixellation effect
  ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, canvas.width, canvas.height);

  return canvas.toBuffer('image/png');
};

export const GET: RequestHandler = async ({ setHeaders, request }) => {
  const hash = new URL(request.url).searchParams.get('hash');
  const url = atob(hash || '');
  if (!url) {
    return error(400, 'Bad Request');
  }
  console.log(url, `./static${url}`)
  const image = await loadImage(`./static${url}`);
  const pixellatedImage = await createPixellatedImage(image, 300);

  setHeaders({
    'Content-Type': 'image/png',
    'Content-Length': pixellatedImage.length
  });

  return new Response(pixellatedImage);
};