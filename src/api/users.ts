import { z } from "zod";
import { base_url } from "./constants";

const schema = z.object({
  user_id: z.string().uuid("user id required"),
});

export async function FetchUserById(params: UserRequest): Promise<UserResponse> {
  const result = schema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/users/${params.user_id}`

  try {
    const resp = await fetch(url, {
      credentials: "include",
    });
    if (!resp.ok) {
      throw new Error(`failed with code ${resp.status}, ${resp.statusText}.`);
    }

    const json_data = await resp.json();
    return json_data;
  } catch (err) {
    throw err;
  }
}

export async function FetchCheckSession(): Promise<UserResponse> {
  const url = `${base_url}/users/session`

  try {
    const resp = await fetch(url, {
      credentials: "include",
    });
    if (!resp.ok) {
      throw new Error(`failed with code ${resp.status}, ${resp.statusText}.`);
    }

    const json_data = await resp.json();
    return json_data;
  } catch (err) {
    throw err;
  }
}

export async function FetchRefresh(): Promise<EmptyResponse> {
  const url = `${base_url}/tokens/refresh`

  const payload: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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

export async function FetchLogout(): Promise<EmptyResponse> {
  const url = `${base_url}/users/session`
  const payload: RequestInit = {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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
