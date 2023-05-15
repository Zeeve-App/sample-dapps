import Identicon from 'identicon.js';

interface IdenticonProps {
  hash: string;
  size: number;
}

export const generateIdenticon = (hash: string, size: number) => {
  return new Identicon(hash, size).toString();
};
