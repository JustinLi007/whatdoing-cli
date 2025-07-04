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
