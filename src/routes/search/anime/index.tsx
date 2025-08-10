import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from 'react';
import { z } from 'zod'
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { FetchAllAnime } from '../../../api/anime';
import Card from '../../../ui/Card';
import { newDocClickHandler } from '../../../utils/ui';
import debounce from '../../../utils/debounce';

const searchAnimeSchema = z.object({
  search: fallback(z.string(), "").default(""),
  sort: fallback(z.enum(["asc", "desc"]), "asc").default("asc"),
  ignore: fallback(z.enum(["", "library"]), "").default(""),
});

export const Route = createFileRoute('/search/anime/')({
  component: SearchAnime,
  validateSearch: zodValidator(searchAnimeSchema),
  head: () => ({
    meta: [
      {
        title: "Search - Anime",
      }
    ],
  }),
});

const performSearch = debounce(500);

function SearchAnime() {
  const { search, sort, ignore } = Route.useSearch();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();

  const [search_value, setSearchValue] = useState<string>(search);
  const [sort_value, setSortValue] = useState<SortOptions>(sort);
  const [sort_hidden, setSortHidden] = useState<boolean>(true);
  const [ignore_value, setIgnoreValue] = useState<IgnoreOptions>(ignore);
  const [ignore_hidden, setIgnoreHidden] = useState<boolean>(true);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["search", "anime", sort_value, ignore_value],
    queryFn: async () => {
      const data = await FetchAllAnime({
        search: search_value,
        sort: sort_value,
        ignore: ignore_value,
      });
      return data;
    },
  });

  const toggleSortDropdown = newDocClickHandler("search-anime-sort-dropdown", setSortHidden);
  const toggleIgnoreDropdown = newDocClickHandler("search-anime-ignore-dropdown", setIgnoreHidden);

  useEffect(() => {
    document.addEventListener("click", toggleSortDropdown);
    document.addEventListener("click", toggleIgnoreDropdown);
    return () => {
      document.removeEventListener("click", toggleSortDropdown);
      document.removeEventListener("click", toggleIgnoreDropdown);
    }
  }, []);

  useEffect(() => {
    setSearchValue(search);
    setSortValue(sort);
    setIgnoreValue(ignore);
  }, [search, sort, ignore]);

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
          search: val,
          sort: sort_value,
          ignore: ignore,
        }
      });
      queryClient.invalidateQueries({
        queryKey: ["search", "anime", sort_value, ignore_value],
      });
    });
  }

  function handleSearchOnKeyDown(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Enter") {
      navigate({
        search: {
          search: search_value,
          sort: sort_value,
          ignore: ignore,
        }
      });
      queryClient.invalidateQueries({
        queryKey: ["search", "anime", sort_value, ignore_value],
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
        ignore: ignore,
      }
    });
  }

  function handleIgnoreOnClick(_: MouseEvent, ignore_value: IgnoreOptions) {
    setIgnoreValue(ignore_value);
    setIgnoreHidden(true);
    navigate({
      search: {
        search: search_value,
        sort: sort_value,
        ignore: ignore_value,
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
      <div>Something went wrong...{error.message}</div>
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
          <div id="search-anime-sort-dropdown" className="relative inline-block w-full">
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
        <div>
          <div id="search-anime-ignore-dropdown" className="relative inline-block w-full">
            <button
              type="button"
              onClick={() => { setIgnoreHidden(!ignore_hidden); }}
              className={`border-1 border-gray-500 py-1 px-3`}
            >Ignore{ignore === "" ? "" : ": " + ignore}</button>
            <div className={`absolute left-0 right-0 bg-gray-700 z-10 ${ignore_hidden ? "hidden" : ""}`}>
              <div onClick={(e) => { handleIgnoreOnClick(e, ""); }} className="hover:bg-gray-500">None</div>
              <div onClick={(e) => { handleIgnoreOnClick(e, "library"); }} className="hover:bg-gray-500">In Library</div>
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
              contentLink={`/contents/anime/${anime.id}`}
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
