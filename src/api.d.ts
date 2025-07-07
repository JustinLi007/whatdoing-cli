type WithNext = {
  next: string;
}

type SignupRequest = {
  email: string;
  password: string;
  username: string | null;
}
type SignupResponse = Pick<LoginResponse, "user" | "next">

type LoginRequest = Pick<SignupRequest, "email" | "password">
type LoginResponse = WithNext & {
  user: User;
}

type UserRequest = {
  user_id: string;
}
type UserResponse = {
  user: User;
}

type CreateContentRequest = {
  name: string;
  content_type: string;
  content_id?: string;
  episodes?: number;
  description?: string;
  image_url?: string;
}
type CreateContentResponse = WithNext & {}

type AllAnimeResponse = {
  anime_list: Anime[];
}

type GetContentRequest = {
  content_id: string;
}

type GetContentResponse = {
  content: ContentTypes;
}

type UpdateContentRequest = {
  content_id: string;
  content_names_id: string;
  content_type: string;
  description: string;
  image_url: string;
  episodes: number;
}

type UpdateContentResponse = WithNext & {}
