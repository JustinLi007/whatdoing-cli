import { createFileRoute } from '@tanstack/react-router'
import ButtonDropdown from '../ButtonDropdown';
import { useState } from 'react';

export const Route = createFileRoute('/home')({
  component: Home,
})

function Home() {

  const items = [
    "one",
    "two",
    "three",
    "four",
    "five",
  ];

  const [dropdownHidden, setDropdownHidden] = useState(true);
  const [selectedSortValue, setSelectedSortValue] = useState("Sort");

  function handleDropdownSelection(value: string) {
    setSelectedSortValue(value);
    // setDropdownHidden(!dropdownHidden);
  }

  function handleDropdownToggle() {
    setDropdownHidden(!dropdownHidden);
  }

  return (
    <div
      className={`flex flex-row flex-nowrap gap-2`}
    >
      <input
        type="text"
        placeholder="search"
        className={`border-gray-500 border-1 py-1 px-3`}
      />
      <div
        className={`flex flex-row flex-nowrap gap-0.5 ml-auto`}
      >
        <ButtonDropdown
          SelectedValue={selectedSortValue}
          DropdownHidden={dropdownHidden}
          Options={items}
          OnSelect={handleDropdownSelection}
          OnClick={handleDropdownToggle}
        />
      </div>
    </div>
  );
}
