/// <reference types="vite/client" />

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
  userId: string;
}

type UserResponse = {
  user: User;
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
  imageSrc: string;
  contentLink: string;
}
