import { z } from "zod";
import { base_url } from "./constants";

const CreateContentSchema = z.object({
  content_id: z.string().optional(),
  name: z.string().trim().min(1, "name required"),
  content_type: z.string().trim().min(1, "content type required"),
  episodes: z.number().gt(0, "episodes cannot be less than 0").optional(),
  image_url: z.string().url("image url must be a valid url").optional(),
  description: z.string().optional(),
});

export async function FetchCreateContent(params: CreateContentRequest): Promise<CreateContentResponse> {
  const result = CreateContentSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/contents`;
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

