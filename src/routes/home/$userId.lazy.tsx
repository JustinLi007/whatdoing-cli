import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, type ChangeEvent } from 'react';
import Search from '../../ui/Search';
import ButtonDropdown from '../../ui/ButtonDropdown';
import Container from '../../ui/Container';
import { FetchUserById } from '../../api/users';
import { useQuery } from '@tanstack/react-query';
import Refresher from '../../ui/Refresher';

export const Route = createLazyFileRoute('/home/$userId')({
  component: Home,
})

// TODO: get from server?
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

const foo: ContentTypes[] = [
  {
    id: "1",
    created_at: "",
    updated_at: "",
    kind: "anime",
    anime_name: {
      id: "1",
      created_at: "",
      updated_at: "",
      name: "Shiunji-ke_no_Kodomotachi",
    },
    episodes: 1,
    description: "anime description here or whatever",
    image_url: "https://cdn.myanimelist.net/images/anime/1955/148360.jpg",
  },
  {
    id: "2",
    created_at: "",
    updated_at: "",
    kind: "anime",
    anime_name: {
      id: "2",
      created_at: "",
      updated_at: "",
      name: "Danjo no Yuujou wa Seiritsu suru? (Iya, Shinai!!)",
    },
    episodes: 2,
    description: "anime description here or whatever",
    image_url: "https://cdn.myanimelist.net/images/anime/1743/126822l.jpg",
  },
  {
    id: "3",
    created_at: "",
    updated_at: "",
    kind: "anime",
    anime_name: {
      id: "3",
      created_at: "",
      updated_at: "",
      name: "Haite Kudasai, Takamine-san",
    },
    episodes: 3,
    description: "anime description here or whatever",
    image_url: "https://m.media-amazon.com/images/M/MV5BNjkyZWIzNDMtODFmOC00NjY2LWJhNjgtZDBiMzVmNmIxZjdlXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: "4",
    created_at: "",
    updated_at: "",
    kind: "anime",
    anime_name: {
      id: "4",
      created_at: "",
      updated_at: "",
      name: "Summer Pockets",
    },
    episodes: 4,
    description: "anime description here or whatever",
    image_url: "https://m.media-amazon.com/images/M/MV5BNDUxM2FiY2UtMDFlNS00OGFiLTlkNTMtY2ZlYzVlZWUzNTFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
];

function Home() {
  const { userId } = Route.useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: [userId],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await FetchUserById({ user_id: userId });
      return data;
    },
  });

  const [sortDropdownHidden, setSortDropdownHidden] = useState(true);
  const [selectedSortValue, setSelectedSortValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  function handleSortDropdownSelection(value: SuggestionItem) {
    setSelectedSortValue(value.title);
    setSortDropdownHidden(!sortDropdownHidden);
  }

  function handleSortDropdownToggle() {
    setSortDropdownHidden(!sortDropdownHidden);
  }

  function handleSearchInputChange(event: ChangeEvent) {
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
      <div>something went wrong... {error.message}</div>
    );
  }

  return (
    <>
      <div>
        hello {data.user.email}...
      </div>

      <div className={`flex flex-row flex-nowrap gap-2`}>
        <div>
          <Search searchValue={searchValue} onChange={handleSearchInputChange} />
        </div>
        <div className={`flex flex-row flex-nowrap gap-0.5 ml-auto`}>
          <ButtonDropdown
            name={`Sort`}
            selectedValue={selectedSortValue}
            dropdownHidden={sortDropdownHidden}
            dropdownItems={sortOptions}
            onSelect={handleSortDropdownSelection}
            onClick={handleSortDropdownToggle}
          />
        </div>
      </div>

      <Container
        Items={foo}
        SearchValue={searchValue}
        SortValue={selectedSortValue}
      />
      <Refresher />
    </>
  );
}
