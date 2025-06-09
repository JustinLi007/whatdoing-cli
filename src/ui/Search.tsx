import { type ChangeEvent } from 'react';

interface Parameters {
  SearchValue: string,
  OnChange: (e: ChangeEvent) => void,
}

export default function Search(params: Parameters) {
  return (
    <input
      type="text"
      value={params.SearchValue}
      onChange={(e) => { params.OnChange(e); }}
      placeholder="search"
      className={`border-gray-500 border-1 py-1 px-3 outline-0`}
    />
  );
}
