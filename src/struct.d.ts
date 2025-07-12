type StructBase = {
  id: string;
  created_at: string;
  updated_at: string;
}

type User = StructBase & {
  email: string;
  role: string;
  username: string | null;
}

type ContentTypes = Anime | Manga;
type ContentKinds = "anime" | "manga";

type Anime = StructBase & {
  kind: "anime";
  episodes?: number;
  description?: string;
  image_url?: string;
  anime_name: AnimeName;
  alternative_names: AnimeName[];
}

type AnimeName = StructBase & {
  name: string;
}

type Manga = StructBase & {
  kind: "manga";
  chapters: number;
}

type RelAnimeAnimeNames = StructBase & {
  anime_id: string;
  anime_name: AnimeName;
}
