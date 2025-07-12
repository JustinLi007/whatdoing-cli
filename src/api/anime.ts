import { z } from "zod";
import { base_url } from "./constants";

const NamesByAnimeSchema = z.object({
  anime_id: z.string(),
});

export async function FetchNamesByAnime(params: NamesByAnimeRequest): Promise<NamesByAnimeResponse> {
  const result = NamesByAnimeSchema.safeParse(params);
  if (!result.success) {
    throw new Error(`invalid params`);
  }

  const url = `${base_url}/names/anime/${params.anime_id}`;

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
