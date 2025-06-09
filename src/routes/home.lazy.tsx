import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, type ChangeEvent } from 'react';
import Search from '../ui/Search';
import ButtonDropdown from '../ui/ButtonDropdown';
import Container from '../ui/Container';

export const Route = createLazyFileRoute('/home')({
  component: Home,
})

const sortOptions = [
  "Desc",
  "Asc",
  "Recently Updated",
];

const contestList: Content[] = [
  {
    Id: "1",
    Title: "Shiunji-ke_no_Kodomotachi",
    Episode: 1,
    Description: "anime description here or whatever",
    ImageSrc: "https://cdn.myanimelist.net/images/anime/1955/148360.jpg",
    ContentLink: "https://myanimelist.net/anime/58131/Shiunji-ke_no_Kodomotachi",
  },
  {
    Id: "2",
    Title: "Danjo no Yuujou wa Seiritsu suru? (Iya, Shinai!!)",
    Episode: 2,
    Description: "anime description here or whatever",
    ImageSrc: "https://cdn.myanimelist.net/images/anime/1743/126822l.jpg",
    ContentLink: "https://myanimelist.net/anime/52709/Danjo_no_Yuujou_wa_Seiritsu_suru_Iya_Shinai",
  },
  {
    Id: "3",
    Title: "Haite Kudasai, Takamine-san",
    Episode: 3,
    Description: "anime description here or whatever",
    ImageSrc: "https://m.media-amazon.com/images/M/MV5BNjkyZWIzNDMtODFmOC00NjY2LWJhNjgtZDBiMzVmNmIxZjdlXkEyXkFqcGc@._V1_.jpg",
    ContentLink: "https://myanimelist.net/anime/59457/Haite_Kudasai_Takamine-san",
  },
  {
    Id: "4",
    Title: "Summer Pockets",
    Episode: 4,
    Description: "anime description here or whatever",
    ImageSrc: "https://m.media-amazon.com/images/M/MV5BNDUxM2FiY2UtMDFlNS00OGFiLTlkNTMtY2ZlYzVlZWUzNTFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    ContentLink: "https://myanimelist.net/anime/50694/Summer_Pockets",
  },
]

function Home() {
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

  return (
    <>
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
