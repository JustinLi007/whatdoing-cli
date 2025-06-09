interface Parameters {
  DropdownItems: string[],
  DropdownHidden: boolean,
  OnSelect: (value: string) => void
}

export default function Dropdown(params: Parameters) {
  const items = params.DropdownItems.map((value, index) => {
    return (
      <div
        key={`${value}-${index}`}
        onClick={() => {
          params.OnSelect(value);
        }}
        className={`hover:bg-gray-500`}
      >
        {value}
      </div>
    );
  });

  return (
    <div
      className={`absolute left-0 right-0 bg-gray-700 ${params.DropdownHidden ? "hidden" : ""}`}
    >
      {items}
    </div>
  );
}
