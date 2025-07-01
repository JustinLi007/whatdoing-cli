/// <reference types="vite/client" />

type SortCompare<T> = (base: T, other: T) => -1 | 0 | 1;
type CompareFn<T, U> = (base: T, other: U) => boolean;

type SignupRequest = {
  email: string;
  password: string;
  username: string | null;
}

type LoginRequest = Pick<SignupRequest, "email" | "password">

type LoginResponse = {
  user: User;
  next: string;
}

type SignupResponse = Pick<LoginResponse, "user" | "next">

type UserRequest = {
  user_id: string;
}

type UserResponse = {
  user: User;
}

type CreateContentRequest = {
  content_id?: string;
  name: string;
  content_type: string;
  episodes?: number;
  image_url?: string;
  description?: string;
}

type CreateContentResponse = {
  next: string;
}

type AllAnimeResponse = {
  anime_list: Anime[];
}

type Anime = {
  id: string;
  created_at: string;
  updated_at: string;
  episodes: number;
  description: string;
  anime_name: AnimeName;
}

type AnimeName = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

type MenuItem = {
  id: string;
  name: string;
  path: string;
}

type User = {
  id: string;
  created_at: number;
  updated_at: number;
  email: string;
  role: string;
  username: string | null;
}

type Content = {
  id: string;
  title: string;
  episode: number;
  description: string;
  image_src: string;
  content_link: string;
}
