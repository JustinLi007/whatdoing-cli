import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import { FetchAllAnime } from '../../../api/anime';
import Search from '../../../ui/Search';
import Card from '../../../ui/Card';

export const Route = createLazyFileRoute('/search/anime/')({
  component: SearchAnime,
})

function SearchAnime() {
  const navigate = useNavigate({
    from: "/search/anime",
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["anime_list"],
    queryFn: async () => {
      const data = await FetchAllAnime();
      return data;
    },
  });

  const [searchValue, setSearchValue] = useState("");
  const [selectedItemKey, setSelectedItemKey] = useState("");

  function handleSearchOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    setSearchValue(val);
  }

  function getBaseAnimeList() {
    if (!data) {
      return (<></>);
    }

    const animeCards = data.anime_list.map((anime) => {
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
    <div className={`relative h-full flex flex-col flex-nowrap p-4`}>
      <div>
        <Search searchValue={searchValue} onChange={handleSearchOnChange} />
      </div>
      <div className={``}>
        {getBaseAnimeList()}
      </div>
    </div>
  );
}
