/// <reference types="vite/client" />

type LoginRequestParams = {
  email: string;
  password: string;
}

type SignupRequestParams = LoginRequestParams & {
  username: string | null,
}

type MenuItem = {
  Id: string,
  Name: string,
  Path: string,
}

type User = {
  id: string,
  created_at: number,
  updated_at: number,
  email: string,
  role: string,
  username: string | null,
}

type Content = {
  Id: string,
  Title: string,
  Episode: number,
  Description: string,
  ImageSrc: string,
  ContentLink: string,
}
