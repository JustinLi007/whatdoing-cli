import { type ChangeEvent, type MouseEvent } from 'react';

type Parameters = {
  searchValue: string;
  onChange: (e: ChangeEvent) => void;
  onClick?: (e: MouseEvent) => void;
}

export default function Search(params: Parameters) {
  return (
    <input
      type="text"
      value={params.searchValue}
      onChange={(e) => { params.onChange(e); }}
      onClick={(e) => {
        if (params.onClick) {
          params.onClick(e);
        }
      }}
      placeholder="search"
      className={`border-gray-500 border-1 py-1 px-3 outline-0 w-full`}
    />
  );
}
