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
        onClick={() => { params.OnSelect(value) }}
      >
        {value}
      </div>
    );
  });

  return (
    <div
      className={`absolute ${params.DropdownHidden ? "hidden" : ""}`}
    >
      {items}
    </div>
  );
}
