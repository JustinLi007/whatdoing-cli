import { z } from "zod";
import { base_url } from "./constants";

const AddAnimeToLibrarySchema = z.object({
  anime_id: z.string(),
});

const GetProgressSchema = z.object({
  progress_id: z.string(),
  anime_id: z.string(),
  status: z.string(),
});

const SetProgressSchema = z.object({
  progress_id: z.string(),
  episode: z.number().min(1),
});

const SetStatusSchema = z.object({
  progress_id: z.string(),
  status: z.string(),
});

const DeleteProgressSchema = z.object({
  progress_id: z.string(),
});

export async function FetchAddAnimeToLibrary(params: AddAnimeToLibraryRequest): Promise<ProgressResponse> {
  const result = AddAnimeToLibrarySchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/library/anime`;
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

  const url = `${base_url}/library/anime/progress?progress_id=${params.progress_id}&anime_id=${params.anime_id}&status=${params.status}`;

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

  const url = `${base_url}/library/anime/progress`;
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

export async function FetchSetStatus(params: SetStatusRequest): Promise<EmptyResponse> {
  const result = SetStatusSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/library/anime/status`;
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

  const url = `${base_url}/library/anime/progress`;
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
