type Parameters = {
  dropdownItems: SuggestionItem[];
  dropdownHidden: boolean;
  onSelect: (value: SuggestionItem) => void;
}

export default function Dropdown(params: Parameters) {
  const items = params.dropdownItems.map((value) => {
    return (
      <div
        key={value.key}
        onClick={() => {
          params.onSelect(value);
        }}
        className={`hover:bg-gray-500`}
      >
        {value.title}
      </div>
    );
  });

  return (
    <div
      className={`absolute left-0 right-0 bg-gray-700 z-10 ${params.dropdownHidden ? "hidden" : ""}`}
    >
      {items}
    </div>
  );
}
