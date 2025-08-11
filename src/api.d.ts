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
  anime_id: string;
  anime_names_id: string;
  description: string;
  image_url: string;
  episodes: number;
}

type DeleteAnimeRequest = {
  anime_id: string;
}

type AddAnimeToLibraryRequest = {
  anime_id: string;
}

type GetProgressRequest = {
  progress_id?: string;
  anime_id?: string;
  status?: StatusOptions;
  search?: string;
  sort?: string;
}

type SetProgressRequest = {
  progress_id: string;
  episode: number;
}

type RemoveProgressRequest = {
  progress_id: string;
}

type AddAnimeAltNameRequest = {
  anime_id: string;
  alternative_name: string;
}

type DeleteAnimeAltNamesRequest = {
  anime_id: string;
  anime_names_ids: string[];
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
