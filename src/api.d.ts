type SignupRequest = {
  email: string;
  password: string;
  username: string | null;
}

type LoginRequest = Pick<SignupRequest, "email" | "password">

type UserRequest = {
  user_id: string;
}

type CreateAnimeRequest = {
  name: string;
  episodes: number;
  description: string;
  image_url: string;
}

type GetAnimeRequest = {
  anime_id: string;
}

type AllAnimeRequest = {
  search: string;
  sort: SortOptions;
  ignore: IgnoreOptions;
}

type UpdateAnimeRequest = {
  content_id: string;
  content_names_id: string;
  content_type: string;
  description: string;
  image_url: string;
  episodes: number;
  alternative_names: string[];
}

type AddAnimeToLibraryRequest = {
  anime_id: string;
}

type GetProgressRequest = {
  progress_id?: string;
  anime_id?: string;
  status?: StatusOptions;
}

type SetProgressRequest = {
  progress_id: string;
  episode: number;
}

type RemoveProgressRequest = {
  progress_id: string;
}

type EmptyResponse = {}

type UserResponse = {
  user: User;
}

type AnimeResponse = {
  anime: Anime;
}

type AnimeArrayResponse = {
  anime: Anime[];
}

type ProgressResponse = {
  progress: RelAnimeUserLibrary;
}

type ProgressArrayResponse = {
  progress: RelAnimeUserLibrary[];
}
