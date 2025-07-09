/// <reference types="vite/client" />

type SortCompare<T> = (base: T, other: T) => -1 | 0 | 1;
type CompareFn<T, U> = (base: T, other: U) => boolean;

type MenuItem = {
  id: string;
  name: string;
  path: string;
}

type SuggestionItem = {
  kind: ContentKinds;
  key: string;
  title: string;
  description?: string;
  link?: string;
  image?: string;
}

type SetAnimeFn = (name: string, episodes: number, image_url: string, description: string) => void
