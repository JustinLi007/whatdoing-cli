import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react';
import { FetchAddAnimeAltName, FetchAnimeById, FetchDeleteAnime, FetchDeleteAnimeAltNames, FetchUpdateAnime } from '../../../api/anime';

export const Route = createLazyFileRoute('/edit/anime/$animeId')({
  component: EditAnime,
});

function EditAnime() {
  const queryClient = useQueryClient();
  const navigate = Route.useNavigate();
  const { animeId } = Route.useParams();

  const [name, setName] = useState<string>("");
  const [episodes, setEpisodes] = useState<number>(0);
  const [image_url, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [alt_name, setAltName] = useState<string>("");
  const [alt_name_id, setAltNameId] = useState<string>("");
  const [edit_alt_names, setEditAltNames] = useState<boolean>(false);
  const [names_to_delete, setNamesToDelete] = useState<string[]>([]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["edit", "anime", animeId],
    queryFn: async () => {
      const data = await FetchAnimeById({ anime_id: animeId });
      setName(data.anime.anime_name.name);
      setEpisodes(data.anime.episodes);
      setImageUrl(data.anime.image_url ?? "");
      setDescription(data.anime.description ?? "");
      setAltNameId(data.anime.anime_name.id);
      return data;
    },
  });

  const mutationUpdateAnime = useMutation({
    mutationFn: FetchUpdateAnime,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["edit", "anime", animeId],
      });
    },
    onError(error) {
      queryClient.invalidateQueries({
        queryKey: ["edit", "anime", animeId],
      });
      console.log(`error: failed to update anime entry: ${error}`);
    },
  });

  const mutationDeleteAnime = useMutation({
    mutationFn: FetchDeleteAnime,
    onSuccess() {
      navigate({
        to: "/data/anime"
      });
    },
    onError(error) {
      queryClient.invalidateQueries({
        queryKey: ["edit", "anime", animeId],
      });
      console.log(`error: failed to delete anime entry: ${error}`);
    },
  });

  const mutationAddAltName = useMutation({
    mutationFn: FetchAddAnimeAltName,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["edit", "anime", animeId],
      });
      setAltName("");
    },
    onError(error) {
      queryClient.invalidateQueries({
        queryKey: ["edit", "anime", animeId],
      });
      setAltName("");
      console.log(`error: failed to add anime alt name: ${error}`);
    },
  });

  const mutationDeleteAltNames = useMutation({
    mutationFn: FetchDeleteAnimeAltNames,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["edit", "anime", animeId],
      });
      setNamesToDelete([]);
    },
    onError(error) {
      queryClient.invalidateQueries({
        queryKey: ["edit", "anime", animeId],
      });
      setNamesToDelete([]);
      console.log(`error: failed to delete anime alt names: ${error}`);
    },
  });

  if (isPending) {
    return (
      <div>Loading...</div>
    );
  }
  if (isError) {
    return (
      <div>Something went wrong...{error.message}</div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!data) {
          return;
        }

        mutationUpdateAnime.mutate({
          anime_id: data.anime.id,
          anime_names_id: alt_name_id,
          description: description,
          episodes: episodes,
          image_url: image_url,
        });
      }}
      className="flex flex-col flex-nowrap gap-4 p-4"
    >
      <div>
        <div className="flex flex-col flex-nowrap">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            disabled={true}
            className="border border-gray-500 text-xl p-2 outline-0"
          />
        </div>
        <div className="flex flex-row flex-nowrap justify-end p-1">
          {edit_alt_names ?
            <div className="flex flex-row flex-nowrap gap-1.5" >
              <button
                type="button"
                onClick={() => {
                  setEditAltNames(false);
                  mutationDeleteAltNames.mutate({
                    anime_id: data.anime.id,
                    anime_names_ids: names_to_delete,
                  });
                }}
                className="border border-gray-500 py-0.5 px-3 hover:bg-gray-400 active:bg-gray-500"
              >Delete</button>
              <button
                type="button"
                onClick={() => {
                  setEditAltNames(false);
                  setName(data.anime.anime_name.name);
                  setAltNameId(data.anime.anime_name.id);
                  setNamesToDelete([]);
                }}
                className="border border-gray-500 py-0.5 px-3 hover:bg-gray-400 active:bg-gray-500"
              >Cancel</button>
            </div>
            :
            <button
              type="button"
              onClick={() => {
                setEditAltNames(true);
                setName(data.anime.anime_name.name);
                setAltNameId(data.anime.anime_name.id);
              }}
              className="border border-gray-500 py-0.5 px-3 hover:bg-gray-400 active:bg-gray-500"
            >Edit</button>
          }
        </div>
        <div className="flex flex-row items-center gap-1 p-1">
          {data.anime.alternative_names.map((value) => {
            return (
              <div
                key={value.id}
                onClick={() => {
                  if (edit_alt_names) {
                    if (value.id === alt_name_id) {
                      return;
                    }
                    const idx = names_to_delete.indexOf(value.id);
                    if (idx >= 0) {
                      const newList = names_to_delete.slice();
                      newList.splice(idx, 1);
                      setNamesToDelete(newList);
                    } else {
                      const newList = names_to_delete.slice();
                      setNamesToDelete([...newList, value.id]);
                    }
                    return;
                  }
                  setName(value.name);
                  setAltNameId(value.id);
                }}
                className={`flex flex-row gap-2 text-center border p-1 ${alt_name_id === value.id ? "border-amber-500" : names_to_delete.includes(value.id) ? "border-red-500" : "border-gray-500"}`}
              >
                <div>{value.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col flex-nowrap">
        <input
          type="text"
          value={alt_name}
          onChange={(e) => {
            const t = e.target;
            if (!(t instanceof HTMLInputElement)) {
              return;
            }
            setAltName(t.value);
          }}
          className="border border-gray-500 text-xl p-2 outline-0"
        />
        <button
          type="button"
          onClick={() => {
            mutationAddAltName.mutate({
              anime_id: data.anime.id,
              alternative_name: alt_name,
            });
          }}
          className="border border-gray-500 p-3 w-full hover:bg-gray-400 active:bg-gray-500"
        >Add</button>
      </div>
      <div className="flex flex-col flex-nowrap">
        <label htmlFor="episodes">Episodes:</label>
        <input id="episodes" type="text" value={episodes} onChange={(e) => {
          const t = e.target;
          if (!(t instanceof HTMLInputElement)) {
            return;
          }
          const val = t.value;
          const n = Number(val);
          if (val === "") {
            setEpisodes(0);
          } else if (n) {
            setEpisodes(Math.max(0, n));
          }
        }}
          className="border border-gray-500 text-xl p-2 outline-0"
        />
      </div>
      <div className="flex flex-col flex-nowrap">
        <label htmlFor="image-url">Image:</label>
        <input id="image-url" type="text" value={image_url} onChange={(e) => {
          const t = e.target;
          if (!(t instanceof HTMLInputElement)) {
            return;
          }
          setImageUrl(t.value);
        }}
          className="border border-gray-500 text-xl p-2 outline-0"
        />
      </div>
      <div className="flex flex-col flex-nowrap">
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => {
          const t = e.target;
          if (!(t instanceof HTMLTextAreaElement)) {
            return;
          }
          setDescription(t.value);
        }}
          className="border border-gray-500 outline-0 text-xl p-2 h-48 resize-none"
        />
      </div>
      <div className="text-xl flex flex-row flex-nowrap gap-1.5">
        <button
          type="button"
          onClick={() => {
            mutationDeleteAnime.mutate({
              anime_id: animeId,
            })
          }}
          className="border border-red-600 bg-red-600 p-3 w-full hover:bg-red-800 hover:border-red-800 active:bg-red-600"
        >Delete</button>
        <Link
          to="/data/anime"
          className="text-center border border-gray-500 p-3 w-full hover:bg-gray-400 active:bg-gray-500"
        >Cancel</Link>
        <button
          type="submit"
          className="border border-gray-500 p-3 w-full hover:bg-gray-400 active:bg-gray-500"
        >Update</button>
      </div>
    </form>
  );
}
