import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, type ChangeEvent } from 'react';
import Search from '../../ui/Search';
import ButtonDropdown from '../../ui/ButtonDropdown';
import Container from '../../ui/Container';
import { fetchUserById } from '../../api/users';
import { useQuery } from '@tanstack/react-query';

export const Route = createLazyFileRoute('/home/$userId')({
  component: Home,
})

const sortOptions = [
  "Desc",
  "Asc",
  "Recently Updated",
];

const contestList: Content[] = [
  {
    id: "1",
    title: "Shiunji-ke_no_Kodomotachi",
    episode: 1,
    description: "anime description here or whatever",
    imageSrc: "https://cdn.myanimelist.net/images/anime/1955/148360.jpg",
    contentLink: "https://myanimelist.net/anime/58131/Shiunji-ke_no_Kodomotachi",
  },
  {
    id: "2",
    title: "Danjo no Yuujou wa Seiritsu suru? (Iya, Shinai!!)",
    episode: 2,
    description: "anime description here or whatever",
    imageSrc: "https://cdn.myanimelist.net/images/anime/1743/126822l.jpg",
    contentLink: "https://myanimelist.net/anime/52709/Danjo_no_Yuujou_wa_Seiritsu_suru_Iya_Shinai",
  },
  {
    id: "3",
    title: "Haite Kudasai, Takamine-san",
    episode: 3,
    description: "anime description here or whatever",
    imageSrc: "https://m.media-amazon.com/images/M/MV5BNjkyZWIzNDMtODFmOC00NjY2LWJhNjgtZDBiMzVmNmIxZjdlXkEyXkFqcGc@._V1_.jpg",
    contentLink: "https://myanimelist.net/anime/59457/Haite_Kudasai_Takamine-san",
  },
  {
    id: "4",
    title: "Summer Pockets",
    episode: 4,
    description: "anime description here or whatever",
    imageSrc: "https://m.media-amazon.com/images/M/MV5BNDUxM2FiY2UtMDFlNS00OGFiLTlkNTMtY2ZlYzVlZWUzNTFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    contentLink: "https://myanimelist.net/anime/50694/Summer_Pockets",
  },
]

function Home() {
  const { userId } = Route.useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: [userId],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await fetchUserById({ userId: userId });
      console.log(data);
      return data;
    },
  });

  const [sortDropdownHidden, setSortDropdownHidden] = useState(true);
  const [selectedSortValue, setSelectedSortValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  function handleSortDropdownSelection(value: string) {
    setSelectedSortValue(value);
    setSortDropdownHidden(!sortDropdownHidden);
  }

  function handleSortDropdownToggle() {
    setSortDropdownHidden(!sortDropdownHidden);
  }

  function handleSearchInputChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
    setSearchValue(val);
  }

  if (isPending) {
    return (
      <div>Loading...</div>
    );
  }

  if (isError) {
    return (
      <div>something went wrong... {error.message}</div>
    );
  }

  return (
    <>
      <div>
        hello {data.user.email}...
      </div>

      <div className={`flex flex-row flex-nowrap gap-2`}>
        <Search SearchValue={searchValue} OnChange={handleSearchInputChange} />
        <div className={`flex flex-row flex-nowrap gap-0.5 ml-auto`}>
          <ButtonDropdown
            Name={`Sort`}
            SelectedValue={selectedSortValue}
            DropdownHidden={sortDropdownHidden}
            Options={sortOptions}
            OnSelect={handleSortDropdownSelection}
            OnClick={handleSortDropdownToggle}
          />
        </div>
      </div>

      <Container
        Items={contestList}
        SearchValue={searchValue}
        SortValue={selectedSortValue}
      />
    </>
  );
}
