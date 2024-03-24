import * as crypto from 'crypto';
import { getVideoDataById } from './components/Video/getVideoDataById';

export const hashString = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex'); // Returns the hash in hexadecimal format
}

export const parseMediaBlock = async (block: UnparsedMediaBlock, fetchHandler: typeof fetch) => {
  const image = block?.image ? await import(`../../static/${block.image}?enhanced`) : undefined;
  const video = block?.video ? await getVideoDataById(block.video, fetchHandler) : undefined;

  if (!image && !video) {
    return null;
  }

  return {
    ...block,
    image: image?.default,
    video,
  };
}