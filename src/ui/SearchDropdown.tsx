import { type ChangeEvent, type MouseEvent } from 'react';
import Dropdown from "./Dropdown";
import Search from "./Search";
import filterSearch from '../utils/filter-search';
import kmp from '../utils/kmp';

type Parameters = {
  id?: string;
  searchValue: string;
  dropdownItems: SuggestionItem[];
  dropdownHidden: boolean;
  onChange: (e: ChangeEvent) => void;
  onClick: (e: MouseEvent) => void;
  onSelect: (value: SuggestionItem) => void;
}

export default function SearchDropdown(params: Parameters) {
  const baseItems = params.dropdownItems.slice();
  let filteredItems = filterSearch<SuggestionItem, string>(baseItems, params.searchValue, (a, b) => {
    if (b.trim().toLowerCase() === "") {
      return true;
    }

    const res = kmp(a.title, b) >= 0;
    return res;
  });

  return (
    <>
      <div
        className={`inline-block relative w-full`}
        id={params.id}
      >
        <Search
          searchValue={params.searchValue}
          onChange={params.onChange}
          onClick={params.onClick}
        />
        <Dropdown
          dropdownHidden={params.dropdownHidden}
          dropdownItems={filteredItems}
          onSelect={params.onSelect}
        />
      </div>
    </>
  );
}
