import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'
import { FetchGetProgress } from '../../../api/library';
import { FetchCheckSession } from '../../../api/users';

const librarySearchSchema = z.object({
  status: fallback(z.string(), "").default("started"),
});

export const Route = createFileRoute('/library/started/')({
  component: LibStartedIndex,
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

function LibStartedIndex() {
  const user = Route.useLoaderData();
  const { status } = Route.useSearch();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["library", "started"],
    queryFn: async () => {
      const resp = await FetchGetProgress({
        progress_id: "",
        anime_id: "",
        status: status,
      });
      return resp;
    }
  });

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
      <div>something went wrong...{error.message}</div>
    );
  }

  return (
    <div className="grid grid-flow-row gap-1.5 p-1.5 border border-gray-500">
      <div className="grid grid-cols-5 text-center items-center wrap-break-word font-bold">
        <div className="col-span-2">Title</div>
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
            <div key={value.id} className="flex-1 text-center">
              <Link
                className="w-full h-full inline-block p-3"
                to="/library/started/detail/$progressId"
                params={{ progressId: value.id }}
                activeProps={{ className: "font-bold bg-gray-500" }}
                activeOptions={{ exact: false }}
              >Detail</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
