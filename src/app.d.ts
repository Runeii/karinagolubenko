// See https://kit.svelte.dev/docs/types#app
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
    image: string;
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
}

export { };
