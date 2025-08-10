import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { FetchGetProgress, FetchSetProgress } from '../../../api/progress_anime.ts';
import Input from '../../../ui/Input';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import Button from '../../../ui/Button';

export const Route = createLazyFileRoute('/library/detail/$progressId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { progressId } = Route.useParams();
  const [episode_val, setEpisodeVal] = useState<number>(0);
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["library", "detail", progressId],
    queryFn: async () => {
      const resp = await FetchGetProgress({
        progress_id: progressId,
        anime_id: "",
        search: "",
      });

      if (resp.progress.length > 0) {
        const progress = resp.progress[0];
        setEpisodeVal(progress.episode);
      }

      return resp;
    },
  });

  function handleEpisodeOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }

    if (!data || data.progress.length === 0) {
      return;
    }
    const progress = data.progress[0]

    const val = t.value;
    const n = Number(val);
    if (val === "") {
      setEpisodeVal(n);
    } else {
      const n_bounded = Math.min(progress.anime.episodes, Math.max(1, n));
      setEpisodeVal(n_bounded);
    }
  }

  const mutationUpdateProgress = useMutation({
    mutationFn: FetchSetProgress,
    onSuccess() {
      queryClient.invalidateQueries();
    },
    onError(error) {
      queryClient.invalidateQueries();
      console.log(error);
    },
  });

  function handleOnSubmit(event: FormEvent) {
    event.preventDefault();

    if (!data || data.progress.length === 0) {
      return;
    }
    const progress = data.progress[0]

    mutationUpdateProgress.mutate({
      progress_id: progress.id,
      episode: episode_val,
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
    <>
      {data.progress.length > 0 ?
        <div className={`flex flex-col flex-nowrap gap-4 p-4`}>
          <div className={`text-center font-bold text-lg`}>{data.progress[0].anime.anime_name.name}</div>

          <div className={`flex flex-row flex-nowrap items-center gap-4`}>
            <div className={`inline-block w-64 h-[calc(calc(var(--spacing)*64)*calc(25/16))] aspect-[9/16] justify-items-center content-center`}>
              <img
                className={`object-contain object-center w-64 h-[calc(calc(var(--spacing)*64)*calc(25/16))] aspect-[9/16]`}
                src={`${data.progress[0].anime.image_url ? data.progress[0].anime.image_url : undefined}`}
              />
            </div>
            <div className={`flex flex-col flex-nowrap gap-1.5`}>
              <div className={`font-bold text-center`}>Information</div>
              <div>
                <div className={`font-bold`}>Alternative Names</div>
                <div className={`h-20 overflow-y-auto`}>
                  <ul>
                    {data.progress[0].anime.alternative_names.map((name) => {
                      return (<li key={name.id}>{name.name}</li>);
                    })}
                  </ul>
                </div>
              </div>
              <div>
                <div className={`font-bold`}>Description</div>
                <div className={`inline-block h-48 overflow-y-auto`}>{data.progress[0].anime.description}</div>
              </div>
            </div>
          </div>

          <div>
            <form
              className="flex flex-col flex-nowrap gap-4"
              onSubmit={handleOnSubmit}
            >
              <div>
                <Input
                  id="episode"
                  label="Episode"
                  type="number"
                  value={episode_val}
                  onChange={handleEpisodeOnChange}
                />
              </div>
              <Button text="Update" type="submit" onClick={() => { return; }} />
            </form>
          </div>
        </div>
        : ""
      }
    </>
  );
}
