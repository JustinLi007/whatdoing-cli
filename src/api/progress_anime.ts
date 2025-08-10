import { z } from "zod";
import { base_url } from "./constants";

const AddAnimeToLibrarySchema = z.object({
  anime_id: z.string(),
});

const GetProgressSchema = z.object({
  progress_id: z.string().optional(),
  anime_id: z.string().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
});

const SetProgressSchema = z.object({
  progress_id: z.string(),
  episode: z.number().min(0),
});

const DeleteProgressSchema = z.object({
  progress_id: z.string(),
});

export async function FetchAddAnimeToLibrary(params: AddAnimeToLibraryRequest): Promise<ProgressResponse> {
  const result = AddAnimeToLibrarySchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/progress/anime`;
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

export async function FetchGetProgress(params: GetProgressRequest): Promise<ProgressArrayResponse> {
  const result = GetProgressSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const progress_id = params.progress_id ?? "";
  const anime_id = params.anime_id ?? "";
  const search = params.search ?? "";
  const url = `${base_url}/progress/anime?progress_id=${progress_id}&anime_id=${anime_id}&status=${params.status}&search=${search}&sort=${params.sort}`;

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

export async function FetchSetProgress(params: SetProgressRequest): Promise<EmptyResponse> {
  const result = SetProgressSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/progress/anime`;
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

export async function FetchRemoveProgress(params: RemoveProgressRequest): Promise<EmptyResponse> {
  const result = DeleteProgressSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/progress/anime`;
  const payload: RequestInit = {
    method: "DELETE",
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
