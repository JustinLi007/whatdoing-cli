import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'
import type { MouseEvent } from 'react';
import { FetchRemoveProgress, FetchGetProgress, FetchSetStatus } from '../../../api/library';
import Button from '../../../ui/Button';
import { FetchCheckSession } from '../../../api/users';

const librarySearchSchema = z.object({
  status: fallback(z.string(), "").default("not-started"),
});

export const Route = createFileRoute('/library/notstarted/')({
  component: LibNotStartedIndex,
  validateSearch: zodValidator(librarySearchSchema),
  loader: async () => {
    try {
      const resp = await FetchCheckSession();
      return resp;
    } catch (err) {
      return null;
    }
  },
});

function LibNotStartedIndex() {
  const user = Route.useLoaderData();
  const { status } = Route.useSearch();
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["library", "notstarted"],
    queryFn: async () => {
      const resp = await FetchGetProgress({
        progress_id: "",
        anime_id: "",
        status: status,
      });
      return resp;
    }
  });

  const mutationStartAnime = useMutation({
    mutationFn: FetchSetStatus,
    onSuccess() {
      queryClient.invalidateQueries();
    },
    onError(error) {
      queryClient.invalidateQueries();
      console.log(error);
    },
  });

  const mutationRemoveProgress = useMutation({
    mutationFn: FetchRemoveProgress,
    onSuccess() {
      queryClient.invalidateQueries();
    },
    onError(error) {
      queryClient.invalidateQueries();
      console.log(error);
    },
  });

  function handleStartAnime(_: MouseEvent, params: SetStatusRequest) {
    mutationStartAnime.mutate({
      progress_id: params.progress_id,
      status: params.status,
    });
  }

  function handleRemoveProgress(_: MouseEvent, params: RemoveProgressRequest) {
    mutationRemoveProgress.mutate({
      progress_id: params.progress_id,
    });
  }

  if (!user) {
    return (
      <Navigate to="/login" />
    );
  }
  if (isPending) {
    return (
      <div>Loading...</div>
    );
  }
  if (isError) {
    return (
      <>
        <div>something went wrong...{error.message}</div>
      </>
    );
  }

  return (
    <div className={`grid grid-flow-row gap-1.5 p-1.5 border border-gray-500`}>
      <div className={`grid grid-cols-5 text-center items-center wrap-break-word font-bold`}>
        <div className={`col-span-2`}>Title</div>
        <div>Status</div>
        <div>Episode</div>
      </div>
      {data.progress.map((value) => {
        return (
          <div key={value.id} className="grid grid-cols-5 text-center items-center wrap-break-word p-1 border border-gray-500">
            <div>
              <img className="w-full h-full object-contain object-center" src={value.anime.image_url} />
            </div>
            <div>
              <Link to="/contents/anime/$animeId" params={{ animeId: value.anime.id }}>
                {value.anime.anime_name.name}
              </Link>
            </div>
            <div>{value.status}</div>
            <div>{value.episode}</div>
            <div>
              <Button text="Start" onClick={(e) => {
                handleStartAnime(e, {
                  progress_id: value.id,
                  status: "started",
                });
              }} />
              <Button text="Remove" onClick={(e) => {
                handleRemoveProgress(e, {
                  progress_id: value.id,
                });
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
