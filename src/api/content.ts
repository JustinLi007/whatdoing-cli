import { z } from "zod";

const schema = z.object({
  contentId: z.string().uuid("content id must be an uuid").optional(),
  name: z.string().trim().min(1, "name required"),
  episodes: z.number().gt(0, "episodes cannot be less than 0").optional(),
  imageUrl: z.string().url("image url must be a valid url").optional(),
  description: z.string().optional(),
});

export async function FetchCreateContent(params: CreateContentRequest): Promise<CreateContentResponse> {
  const result = schema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  // TODO: need endpoint
  const url = ""
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
