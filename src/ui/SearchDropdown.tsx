import { type ChangeEvent, type MouseEvent } from 'react';
import Dropdown from "./Dropdown";
import Search from "./Search";
import filterSearch from '../utils/filter-search';
import kmp from '../utils/kmp';

type Parameters = {
  id?: string;
  searchValue: string;
  dropdownItems: string[];
  dropdownHidden: boolean;
  onChange: (e: ChangeEvent) => void;
  onClick: (e: MouseEvent) => void;
  onSelect: (value: string) => void;
}

export default function SearchDropdown(params: Parameters) {
  const baseItems = params.dropdownItems.slice();
  let filteredItems = filterSearch<string, string>(baseItems, params.searchValue, (a, b) => {
    if (b.trim().toLowerCase() === "") {
      return true;
    }

    const res = kmp(a, b) >= 0;
    return res;
  });

  return (
    <>
      <div
        className={`inline-block relative w-full`}
        id={params.id}
      >
        <Search
          SearchValue={params.searchValue}
          OnChange={params.onChange}
          OnClick={params.onClick}
        />
        <Dropdown
          DropdownHidden={params.dropdownHidden}
          DropdownItems={filteredItems}
          OnSelect={params.onSelect}
        />
      </div>
    </>
  );
}
