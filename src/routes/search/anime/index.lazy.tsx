import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, type ChangeEvent, type MouseEvent } from 'react';
import { FetchAllAnime } from '../../../api/anime';
import Search from '../../../ui/Search';
import Card from '../../../ui/Card';
import filterSearch from '../../../utils/filter-search';
import kmp from '../../../utils/kmp';
import ButtonDropdown from '../../../ui/ButtonDropdown';
import { newDocClickHandler } from '../../../utils/ui';
import filterSort from '../../../utils/filter-sort';

export const Route = createLazyFileRoute('/search/anime/')({
  component: SearchAnime,
})

// FIX: wtf is this shit
const sortOptions: SuggestionItem[] = [
  {
    key: "1",
    kind: "anime",
    title: "Desc",
  },
  {
    key: "2",
    kind: "anime",
    title: "Asc",
  },
  {
    key: "3",
    kind: "anime",
    title: "Recently Updated",
  },
];

function SearchAnime() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["anime_list"],
    queryFn: async () => {
      const data = await FetchAllAnime();
      return data;
    },
  });

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [sortHidden, setSortHidden] = useState(true);

  const toggleSortDropdown = newDocClickHandler("search-anime-dropdown", (value) => {
    setSortHidden(value);
  });

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
  }

  function handleSortOnClick(event: MouseEvent) {
    setSortHidden(!sortHidden);
  }

  function handleSortOnSelect(value: SuggestionItem) {
    setSortValue(value.title);
    setSortHidden(true);
  }

  function getAnimeList(searchValue: string, sortValue: string) {
    let result: Anime[] = [];
    if (!data) {
      return result;
    }

    result = filterWithSearchValue(data.anime_list, searchValue);
    result = filterWithSortValue(result, sortValue);

    return result;
  }

  function animeToCards(src: Anime[]) {
    const animeCards = src.map((anime) => {
      // FIX: temp link to edit, should be content/anime/$id
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

  function filterWithSortValue(src: Anime[], sort_value: string) {
    const sort_val = sort_value.trim().toLowerCase();
    const src_copy = src.slice();
    if (sort_val === "") {
      return src_copy;
    }

    const desc: SortCompare<Anime> = (base, other) => {
      const base_val = base.anime_name.name.trim().toLowerCase();
      const other_val = other.anime_name.name.trim().toLowerCase();
      if (base_val < other_val) {
        return 1;
      } else if (base_val > other_val) {
        return -1;
      }
      return 0;
    }

    const asc: SortCompare<Anime> = (base, other) => {
      const base_val = base.anime_name.name.trim().toLowerCase();
      const other_val = other.anime_name.name.trim().toLowerCase();
      if (base_val > other_val) {
        return 1;
      } else if (base_val < other_val) {
        return -1;
      }
      return 0;
    }

    let result = src_copy;
    if (sort_val === "desc") {
      result = filterSort<Anime>(result, desc);
    } else if (sort_val === "asc") {
      result = filterSort<Anime>(result, asc);
    }

    return result;
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
    <div className={`h-full flex flex-col flex-nowrap p-4 gap-4`}>
      <div className={`border-gray-500 border`}>
        <Search searchValue={searchValue} onChange={handleSearchOnChange} />
      </div>
      <div className={`flex flex-row flex-nowrap self-start gap-2`}>
        <div>
          <ButtonDropdown
            id="search-anime-dropdown"
            name={`Sort`}
            selectedValue={sortValue}
            dropdownHidden={sortHidden}
            dropdownItems={sortOptions}
            onSelect={handleSortOnSelect}
            onClick={handleSortOnClick}
          />
        </div>
      </div>
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-2`}>
        {animeToCards(getAnimeList(searchValue, sortValue))}
      </div>
    </div>
  );
}
