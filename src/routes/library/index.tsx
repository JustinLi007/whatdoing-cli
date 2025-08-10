import { useEffect, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from 'react';
import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod'
import { fallback, zodValidator } from '@tanstack/zod-adapter'
import { FetchGetProgress, FetchRemoveProgress, FetchSetProgress } from '../../api/progress_anime.ts';
import { FetchCheckSession } from '../../api/users';
import Button from '../../ui/Button';
import debounce from '../../utils/debounce';
import { newDocClickHandler } from '../../utils/ui';

const librarySearchSchema = z.object({
  status: fallback(z.enum(["started", "not-started", "completed"]), "started").default("started"),
  search: fallback(z.string(), "").default(""),
  sort: fallback(z.enum(["asc", "desc"]), "asc").default("asc"),
});

const performSearch = debounce(500);

export const Route = createFileRoute('/library/')({
  component: LibraryIndex,
  validateSearch: zodValidator(librarySearchSchema),
  loader: async () => {
    try {
      const resp = await FetchCheckSession();
      return resp;
    } catch (err) {
      return null;
    }
  },
  head: () => ({
    meta: [
      {
        title: "Library",
      },
    ],
  }),
});

function LibraryIndex() {
  const user = Route.useLoaderData();
  const { status, search, sort } = Route.useSearch();

  const queryClient = useQueryClient();
  const navigate = Route.useNavigate();

  const [search_value, setSearchValue] = useState<string>(search);
  const [sort_value, setSortValue] = useState<SortOptions>(sort);
  const [sort_hidden, setSortHidden] = useState<boolean>(true);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["library", user, status, sort_value],
    queryFn: async () => {
      const resp = await FetchGetProgress({
        status: status,
        search: search_value,
        sort: sort_value,
      });
      return resp;
    }
  });

  const toggleSortDropdown = newDocClickHandler("library-sort-dropdown", setSortHidden);

  useEffect(() => {
    document.addEventListener("click", toggleSortDropdown);
    return () => {
      document.removeEventListener("click", toggleSortDropdown);
    }
  }, []);

  useEffect(() => {
    setSearchValue(search);
    setSortValue(sort);
  }, [search, sort]);

  function handleSearchOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    setSearchValue(val);

    performSearch(() => {
      navigate({
        search: {
          status: status,
          search: val,
          sort: sort_value,
        }
      });
      queryClient.invalidateQueries({
        queryKey: ["library", user, status, sort_value],
      });
    });
  }

  function handleSearchOnKeyDown(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Enter") {
      navigate({
        search: {
          status: status,
          search: search_value,
          sort: sort_value,
        }
      });
      queryClient.invalidateQueries({
        queryKey: ["library", user, status, sort_value],
      });
    }
  }

  function handleSortOnClick(_: MouseEvent, sort_value: SortOptions) {
    setSortValue(sort_value);
    setSortHidden(true);
    navigate({
      search: {
        status: status,
        search: search_value,
        sort: sort_value,
      }
    });
  }

  const mutationSetProgress = useMutation({
    mutationFn: FetchSetProgress,
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

  function handleStartAnime(_: MouseEvent, params: SetProgressRequest) {
    mutationSetProgress.mutate({
      progress_id: params.progress_id,
      episode: 1,
    });
  }

  function handleResetProgress(_: MouseEvent, params: SetProgressRequest) {
    mutationSetProgress.mutate({
      progress_id: params.progress_id,
      episode: 0,
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
      <div>something went wrong...{error.message}</div>
    );
  }

  return (
    <div className={`flex flex-col h-full`}>
      <header className={`shrink-0`}>
      </header>

      <main className="flex-[1_1_auto] overflow-y-auto p-4 flex flex-col flex-nowrap gap-1.5">
        <div className="flex flex-col flex-nowrap gap-1.5">
          <div className="border-gray-500 border">
            <input
              type="text"
              value={search_value}
              placeholder="search"
              onChange={(e) => { handleSearchOnChange(e); }}
              onKeyDown={(e) => { handleSearchOnKeyDown(e); }}
              className="py-1 px-3 outline-0 w-full"
            />
          </div>
          <div className="flex flex-row flex-nowrap justify-end gap-1.5">
            <div>
              <div id="library-sort-dropdown" className="relative inline-block w-full">
                <button
                  type="button"
                  onClick={() => { setSortHidden(!sort_hidden); }}
                  className={`border-1 border-gray-500 py-1 px-3`}
                >Sort: {sort}</button>
                <div className={`absolute left-0 right-0 bg-gray-700 z-10 ${sort_hidden ? "hidden" : ""}`}>
                  <div onClick={(e) => { handleSortOnClick(e, "asc"); }} className="hover:bg-gray-500">Asc</div>
                  <div onClick={(e) => { handleSortOnClick(e, "desc"); }} className="hover:bg-gray-500">Desc</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <div>{status}</div>
                <div>{value.episode}</div>
                <div key={value.id} className="flex-1 text-center">
                  {status === "started" ?
                    <Link
                      to="/library/detail/$progressId"
                      params={{ progressId: value.id }}
                      className="w-full border border-gray-500 inline-block p-3"
                    >
                      Detail
                    </Link>
                    :
                    status === "not-started" ?
                      <div className="flex flex-col flex-nowrap gap-1.5">
                        <Button text="Start" onClick={(e) => {
                          handleStartAnime(e, { progress_id: value.id, episode: 1 });
                        }} />
                        <Button text="Remove" onClick={(e) => {
                          handleRemoveProgress(e, { progress_id: value.id });
                        }} />
                      </div>
                      :
                      <div className="flex flex-col flex-nowrap gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            handleResetProgress(e, { progress_id: value.id, episode: 0 });
                          }}
                          className="border-1 border-gray-500 p-3 w-full"
                        >Reset</button>
                      </div>
                  }
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="shrink-0">
        <div className="w-full p-4">
          <div className="flex flex-row flex-nowrap gap-1 overflow-auto">
            <div className="text-nowrap flex-1 text-center">
              <div className="border border-gray-500">
                <Link
                  to="."
                  search={{ status: "started" }}
                  className={`inline-block w-full p-3 hover:bg-gray-500 active:bg-gray-700 ${status === "started" ? "bg-gray-500" : "bg-gray-900"}`}
                >Started</Link>
              </div>
            </div>
            <div className="text-nowrap flex-1 text-center">
              <div className="border border-gray-500">
                <Link
                  to="."
                  search={{ status: "not-started" }}
                  className={`inline-block w-full p-3 hover:bg-gray-500 active:bg-gray-700 ${status === "not-started" ? "bg-gray-500" : "bg-gray-900"}`}
                >Not Started</Link>
              </div>
            </div>
            <div className="text-nowrap flex-1 text-center">
              <div className="border border-gray-500">
                <Link
                  to="."
                  search={{ status: "completed" }}
                  className={`inline-block w-full p-3 hover:bg-gray-500 active:bg-gray-700 ${status === "completed" ? "bg-gray-500" : "bg-gray-900"}`}
                >Completed</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
