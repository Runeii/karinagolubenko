import * as crypto from 'crypto';

export const hashString = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex'); // Returns the hash in hexadecimal format
}
