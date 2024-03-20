import type { PageLoad, PageServerLoad } from './$types';
import content from '../content/homepage.json';
import { createCanvas, Image } from 'canvas';

const loadImage = async (src: string) => {
  return new Promise<Image>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = `./static${src}`;
  });
}

const createPixellatedImage = async (src: string, pixelSize = 80) => {
  const image = await loadImage(src);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return '';
  }


  ctx.imageSmoothingEnabled = false;

  // Calculate the reduced resolution sizes
  const scaledWidth = Math.ceil(canvas.width / pixelSize);
  const scaledHeight = Math.ceil(canvas.height / pixelSize);

  // Draw the image in reduced resolution
  ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

  // Scale the image back up to original size, causing the pixellation effect
  ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL();
};

export const load: PageServerLoad = async () => {
  const projects = await import.meta.glob('../content/projects/*.json');

  const data = await Promise.all(Object.keys(projects).map(async (project) => {
    const slug = project.split('/').pop()?.split('.').shift() ?? '';

    const module = (await import(`../content/projects/${slug}.json`)).default;

    const prettySlug = `/${slug.replace('project-', '')}`

    const image = module.isPrivate ? await createPixellatedImage(module.image, 300) : module.image;

    return {
      ...module,
      image,
      default: undefined,
      slug: prettySlug,
    }
  }));

  return {
    content,
    projects: data,
  };
};