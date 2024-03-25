// See https://kit.svelte.dev/docs/types#app

import type { HTMLImgAttributes, HTMLSourceAttributes } from "svelte/elements";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  type Project = {
    featuredMedia: MediaBlock;
    slug: string;
    title: string;
    description: string;
    isPrivate: boolean;
    content: string;
  }

  interface Error {
    code: string;
    message: string;
  }

  type UnparsedMediaBlock = {
    image: string;
    video: string;
  }


  type MediaBlock = {
    image: {
      sources: HTMLSourceAttributes,
      img: HTMLImgAttributes,
    };
    imageUrl: string;
    video: BunnyVideo;
  }

}

export { };
