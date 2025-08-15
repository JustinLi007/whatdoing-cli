import { useEffect, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { FetchAllAnime } from '../../../api/anime';
import Card from '../../../ui/Card';
import debounce from '../../../utils/debounce';
import { newDocClickHandler } from '../../../utils/ui';

const dataAnimeSchema = z.object({
  search: fallback(z.string(), "").default(""),
  sort: fallback(z.enum(["asc", "desc"]), "asc").default("asc"),
});

const { debouncedFn, cancelFn } = debounce(500);

export const Route = createFileRoute('/data/anime/')({
  component: RouteComponent,
  validateSearch: zodValidator(dataAnimeSchema),
});

function RouteComponent() {
  const { search, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();

  const [search_value, setSearchValue] = useState<string>(search);
  const [sort_value, setSortValue] = useState<SortOptions>(sort);
  const [sort_hidden, setSortHidden] = useState<boolean>(true);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["data", "anime", sort_value],
    queryFn: async () => {
      const resp = await FetchAllAnime({
        search: search_value,
        sort: sort_value,
        ignore: "",
      });
      return resp;
    }
  });

  const toggleSortDropdown = newDocClickHandler("data-anime-sort-dropdown", setSortHidden);

  useEffect(() => {
    document.addEventListener("click", toggleSortDropdown);
    return () => {
      document.removeEventListener("click", toggleSortDropdown);
    }
  }, []);

  function handleSearchOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    setSearchValue(val);

    debouncedFn(() => {
      navigate({
        search: {
          search: val,
          sort: sort_value,
        }
      });
      queryClient.invalidateQueries({
        queryKey: ["data", "anime", sort_value],
      });
    });
  }

  function handleSearchOnKeyDown(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Enter") {
      cancelFn();
      navigate({
        search: {
          search: search_value,
          sort: sort_value,
        }
      });
      queryClient.invalidateQueries({
        queryKey: ["data", "anime", sort_value],
      });
    }
  }

  function handleSortOnClick(_: MouseEvent, sort_value: SortOptions) {
    setSortValue(sort_value);
    setSortHidden(true);
    navigate({
      search: {
        search: search_value,
        sort: sort_value,
      }
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
    <div className="flex flex-col flex-nowrap p-4 gap-4">
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
          <div id="data-anime-sort-dropdown" className="relative inline-block w-full">
            <button
              type="button"
              onClick={() => { setSortHidden(!sort_hidden); }}
              className={`border-1 border-gray-500 py-1 px-3`}
            >Sort: {sort_value}</button>
            <div className={`absolute left-0 right-0 bg-gray-700 z-10 ${sort_hidden ? "hidden" : ""}`}>
              <div onClick={(e) => { handleSortOnClick(e, "asc"); }} className="hover:bg-gray-500">Asc</div>
              <div onClick={(e) => { handleSortOnClick(e, "desc"); }} className="hover:bg-gray-500">Desc</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data.anime.map((anime) => {
          return (
            <Card
              key={anime.id}
              title={anime.anime_name.name}
              contentLink={`/edit/anime/${anime.id}`}
              description={anime.description}
              episode={anime.episodes}
              imageSrc={anime.image_url}
            />
          );
        })}
      </div>
    </div >
  );
}
