/// <reference types="vite/client" />

interface MenuItem {
  Id: string,
  Name: string,
  Path: string,
}

interface Content {
  Id: string,
  Title: string,
  Episode: number,
  Description: string,
  ImageSrc: string,
  ContentLink: string,
}
