import { z } from "zod";
import { base_url } from "./constants";

const GetContentSchema = z.object({
  anime_id: z.string(),
});

const UpdateAnimeSchema = z.object({
  content_id: z.string(),
  content_names_id: z.string(),
  content_type: z.string().trim().min(1, "content type required"),
  episodes: z.number().gt(0, "episodes cannot be less than 0"),
  image_url: z.string().url("image url must be a valid url"),
  description: z.string(),
  alternative_names: z.string().array(),
});

const CreateAnimeSchema = z.object({
  name: z.string().min(1),
  episodes: z.number().gt(0, "episodes cannot be less than 0"),
  image_url: z.string().url("image url must be a valid url"),
  description: z.string(),
});

const GetAllAnimeSchema = z.object({
  search: z.string(),
  sort: z.enum(["asc", "desc"]),
  ignore: z.enum(["", "library"]),
});

export async function FetchCreateAnime(params: CreateAnimeRequest): Promise<AnimeResponse> {
  const result = CreateAnimeSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/contents/anime`;
  const payload: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }

  try {
    const resp = await fetch(url, payload);
    if (!resp.ok) {
      throw new Error(`failed with code ${resp.status}, ${resp.statusText}.`);
    }

    const json_data = await resp.json();
    return json_data;
  } catch (err) {
    throw err;
  }
}

export async function FetchAnimeById(params: GetAnimeRequest): Promise<AnimeResponse> {
  const result = GetContentSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/contents/anime/${params.anime_id}`;

  try {
    const resp = await fetch(url, { credentials: "include" });
    if (!resp.ok) {
      throw new Error(`failed with code ${resp.status}, ${resp.statusText}.`);
    }

    const json_data = await resp.json();
    return json_data;
  } catch (err) {
    throw err;
  }
}

export async function FetchAllAnime(params: AllAnimeRequest): Promise<AnimeArrayResponse> {
  const result = GetAllAnimeSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/contents/anime?search=${params.search}&sort=${params.sort}&ignore=${params.ignore}`;

  try {
    const resp = await fetch(url, { credentials: "include" });
    if (!resp.ok) {
      throw new Error(`failed with code ${resp.status}, ${resp.statusText}.`);
    }

    const json_data = await resp.json();
    return json_data;
  } catch (err) {
    throw err;
  }
}

export async function FetchUpdateAnime(params: UpdateAnimeRequest): Promise<EmptyResponse> {
  const result = UpdateAnimeSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/contents/anime/${params.content_id}`;
  const payload: RequestInit = {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }

  try {
    const resp = await fetch(url, payload);
    if (!resp.ok) {
      throw new Error(`failed with code ${resp.status}, ${resp.statusText}.`);
    }

    const json_data = await resp.json();
    return json_data;
  } catch (err) {
    throw err;
  }
}
