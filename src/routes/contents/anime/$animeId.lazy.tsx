import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, type MouseEvent } from 'react';
import { FetchAnimeById } from '../../../api/anime';
import { FetchAddAnimeToLibrary, FetchGetProgress } from '../../../api/progress_anime';
import Button from '../../../ui/Button';

export const Route = createLazyFileRoute('/contents/anime/$animeId')({
  component: ContentAnime,
})

function ContentAnime() {
  const { animeId } = Route.useParams();
  const [has_progress, setHasProgress] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["contents", "anime", animeId],
    queryFn: async () => {
      const resp = await FetchAnimeById({ anime_id: animeId });
      return resp;
    },
  });

  const { } = useQuery({
    queryKey: ["contents", "anime", "progress", animeId],
    queryFn: async () => {
      const resp = await FetchGetProgress({
        anime_id: animeId,
      });

      if (resp.progress.length > 0) {
        setHasProgress(true);
      }

      return resp;
    },
  });

  const mutationAddToUserLibrary = useMutation({
    mutationFn: FetchAddAnimeToLibrary,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["contents", "anime", "progress", animeId],
      });
    },
    onError(error) {
      queryClient.invalidateQueries({
        queryKey: ["contents", "anime", "progress", animeId],
      });
      console.log(`${error.name}, ${error.message}`);
    },
  });

  function handleAddToLibraryBtnOnClick(_: MouseEvent) {
    if (has_progress) {
      return;
    }

    mutationAddToUserLibrary.mutate({
      anime_id: animeId,
    });
  }

  if (isPending) {
    return (
      <div>Loading...</div>
    );
  }
  if (isError) {
    return (
      <div>something went wrong...{error.message}</div>
    );
  }

  return (
    <div className="flex flex-col flex-nowrap gap-4 p-4">
      <div className="text-center font-bold text-lg">{data.anime.anime_name.name}</div>
      <div className="flex flex-col flex-nowrap items-center gap-4">
        <div className="inline-block w-64 h-[calc(calc(var(--spacing)*64)*calc(25/16))] aspect-[9/16] justify-items-center content-center">
          <img
            className="object-contain object-center w-64 h-[calc(calc(var(--spacing)*64)*calc(25/16))] aspect-[9/16]"
            src={data.anime.image_url ? data.anime.image_url : undefined}
          />
        </div>
        <div className="inline-block h-48 overflow-y-auto">{data.anime.description}</div>
      </div>
      <div>
        <Button text={has_progress ? "In Library" : "Add To Library"} onClick={handleAddToLibraryBtnOnClick} disabled={has_progress ? true : false} />
        {has_progress ?
          <button>To Library</button>
          : null
        }
      </div>
      <div className="flex flex-col flex-nowrap gap-1.5">
        <div className="font-bold text-center">Information</div>
        <div>
          <div className="font-bold">Alternative Names</div>
          <div>
            <ul>
              {data.anime.alternative_names.map((name) => {
                return (<li key={name.id}>{name.name}</li>);
              })}
            </ul>
          </div>
        </div>
        <div>
          <span className="font-bold">Episodes: </span>
          <span>{data.anime.episodes}</span>
        </div>
      </div>
    </div>
  );
}
