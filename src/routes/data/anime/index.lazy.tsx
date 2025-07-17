import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { FetchAllAnime } from '../../../api/anime';
import Card from '../../../ui/Card';
import Search from '../../../ui/Search';
import { useState, type ChangeEvent } from 'react';
import filterSearch from '../../../utils/filter-search';
import kmp from '../../../utils/kmp';

export const Route = createLazyFileRoute('/data/anime/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search_value, setSearchValue] = useState<string>("");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["data", "anime"],
    queryFn: async () => {
      const resp = await FetchAllAnime();
      return resp;
    }
  });

  function handleSearchOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    setSearchValue(val);
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

  function getAnimeList(searchValue: string) {
    let result: Anime[] = [];
    if (!data) {
      return result;
    }

    result = filterWithSearchValue(data.anime_list, searchValue);

    return result;
  }

  function animeToCards(src: Anime[]) {
    const animeCards = src.map((anime) => {
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
    });
    return animeCards;
  }

  function filterWithSearchValue(src: Anime[], search_value: string) {
    const search_val = search_value.trim().toLowerCase();
    const src_copy = src.slice();
    if (search_val === "") {
      return src_copy;
    }

    const result = filterSearch<Anime, string>(src_copy, search_val, (a, b) => {
      const name = a.anime_name.name.trim().toLowerCase();
      let idx = kmp(name, b);
      if (idx === -1) {
        for (const alt_name of a.alternative_names) {
          const name = alt_name.name.trim().toLowerCase();
          idx = kmp(name, b);
          if (idx >= 0) {
            break;
          }
        }
      }
      return idx !== -1;
    });

    return result;
  }

  return (
    <div className={`h-full flex flex-col flex-nowrap p-4 gap-4`}>
      <div className={`border-gray-500 border`}>
        <Search searchValue={search_value} onChange={handleSearchOnChange} />
      </div>
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-2`}>
        {animeToCards(getAnimeList(search_value))}
      </div>
    </div>
  );
}
