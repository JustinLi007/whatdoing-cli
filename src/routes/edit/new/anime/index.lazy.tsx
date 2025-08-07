import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { FetchAllAnime, FetchCreateAnime } from '../../../../api/anime';
import Card from '../../../../ui/Card';

export const Route = createLazyFileRoute('/edit/new/anime/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState<string>("");
  const [episodes, setEpisodes] = useState<number>(0);
  const [image_url, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["content_list"],
    queryFn: async () => {
      // TODO:
      const data = await FetchAllAnime({
        search: "",
        sort: "asc",
        ignore: "",
      });
      return data;
    },
  });

  const mutationAnime = useMutation({
    mutationFn: FetchCreateAnime,
    onSuccess(data) {
      // queryClient.invalidateQueries();
      navigate({
        to: "/contents/anime/$animeId",
        params: {
          animeId: data.anime.id,
        }
      });
    },
    onError(error) {
      console.log(`error: failed to create anime entry: ${error}`);
    },
  })
  function handleOnSubmitAnime(event: FormEvent) {
    event.preventDefault();
    mutationAnime.mutate({
      name: name,
      description: description,
      episodes: episodes,
      image_url: image_url,
    });
  }

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
    <div className="flex flex-col flex-nowrap gap-4 p-4">
      <form
        onSubmit={(e) => { handleOnSubmitAnime(e); }}
        className="flex flex-col flex-nowrap gap-4"
      >
        <div className="flex flex-col flex-nowrap">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => {
            const t = e.target;
            if (!(t instanceof HTMLInputElement)) {
              return;
            }
            setName(t.value);
          }}
            className="border border-gray-500 text-xl p-2 outline-0"
          />
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
        <div>
          <button
            type="submit"
            className="border border-gray-500 p-3 w-full hover:bg-gray-400 active:bg-gray-500"
          >Submit Entry</button>
        </div>
      </form>
      <div>
        <Card
          title={name}
          episode={episodes}
          contentLink=""
          description={description}
          imageSrc={image_url}
        />
      </div>
    </div>
  );
}
