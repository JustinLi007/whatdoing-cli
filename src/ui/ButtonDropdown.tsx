import type { MouseEvent } from "react";
import Dropdown from "./Dropdown";

type Parameters = {
  id?: string;
  name: string;
  selectedValue: string;
  dropdownHidden: boolean;
  dropdownItems: SuggestionItem[];
  onSelect: (value: SuggestionItem) => void;
  onClick: (event: MouseEvent) => void;
}

export default function ButtonDropdown(params: Parameters) {
  return (
    <div
      className={`inline-block relative w-full`}
      id={params.id}
    >
      <button
        type="button"
        className={`border-1 border-gray-500 py-1 px-3`}
        onClick={(e) => {
          params.onClick(e);
        }}
      >
        {`${params.name}${params.selectedValue === "" ? "" : `: ${params.selectedValue}`}`}
      </button>
      <Dropdown
        dropdownItems={params.dropdownItems}
        dropdownHidden={params.dropdownHidden}
        onSelect={params.onSelect}
      />
    </div>
  );
}
