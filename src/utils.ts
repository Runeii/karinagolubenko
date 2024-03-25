import * as crypto from 'crypto';
import { getVideoDataById } from './components/Video/getVideoDataById';
import type { HTMLImgAttributes } from 'svelte/elements';

export const hashString = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex'); // Returns the hash in hexadecimal format
}

const images = import.meta.glob(
  '../static/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,PNG,JPEG,JPG}',
  {
    query: {
      enhanced: true
    }
  }
);

export const parseMediaBlock = async (block: UnparsedMediaBlock, fetchHandler: typeof fetch) => {
  if (!block) {
    return null;
  }

  const image = block.image ? await images[`../static${block.image}`]?.() as { default: HTMLImgAttributes } : undefined;
  const video = block.video ? await getVideoDataById(block.video, fetchHandler) : undefined;
  const simpleImgUrl = block.image;

  if (!image && !video && !simpleImgUrl) {
    return null;
  }

  return {
    ...block,
    imageUrl: simpleImgUrl,
    image: image?.default,
    video,
  };
}