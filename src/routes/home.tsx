import { createFileRoute } from '@tanstack/react-router'
import ButtonDropdown from '../ButtonDropdown';
import { useState, type ChangeEvent } from 'react';

export const Route = createFileRoute('/home')({
  component: Home,
})

function Home() {
  const sortOptions = [
    "Desc",
    "Asc",
    "Recently Updated",
  ];

  const suggestedItems = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
  ];

  const [sortDropdownHidden, setSortDropdownHidden] = useState(true);
  const [selectedSortValue, setSelectedSortValue] = useState("Sort");
  const [searchValue, setSearchValue] = useState("");

  function handleSortDropdownSelection(value: string) {
    setSelectedSortValue(value);
    // setDropdownHidden(!dropdownHidden);
  }

  function handleSortDropdownToggle() {
    setSortDropdownHidden(!sortDropdownHidden);
  }

  function handleSearchInputChange(event: ChangeEvent) {
    const val = event.target.value;
    setSearchValue(val);
  }

  return (
    <>
      <div
        className={`flex flex-row flex-nowrap gap-2`}
      >
        <input
          type="text"
          value={searchValue}
          onChange={(e) => { handleSearchInputChange(e); }}
          placeholder="search"
          className={`border-gray-500 border-1 py-1 px-3 outline-0`}
        />
        <div
          className={`flex flex-row flex-nowrap gap-0.5 ml-auto`}
        >
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

      <div>
        shit go here
      </div>
    </>
  );
}
