import { type ChangeEvent, type MouseEvent } from 'react';
import Dropdown from "./Dropdown";
import Search from "./Search";
import filterSearch from '../utils/filter-search';

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
  // FIX: filterSearch is shit right now
  const tempWrapper = [];
  for (const v of baseItems) {
    tempWrapper.push({
      title: v,
    });
  }
  const filteredItems = filterSearch(baseItems, params.searchValue, false);

  return (
    <>
      <div
        id={params.id}
      >
        <Search
          SearchValue={params.searchValue}
          OnChange={params.onChange}
          OnClick={params.onClick}
        />
        <Dropdown
          DropdownHidden={params.dropdownHidden}
          DropdownItems={params.dropdownItems}
          OnSelect={params.onSelect}
        />
      </div>
    </>
  );
}
