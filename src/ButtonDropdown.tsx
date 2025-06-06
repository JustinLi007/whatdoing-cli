import Dropdown from "./Dropdown";

interface Parameters {
  SelectedValue: string,
  DropdownHidden: boolean,
  Options: string[],
  OnSelect: (value: string) => void
  OnClick: () => void
}

export default function ButtonDropdown(params: Parameters) {

  return (
    <div
      className={`inline-block`}
    >
      <button
        className={`border-1 border-gray-500 py-1 px-3`}
        onClick={params.OnClick}
      >
        {params.SelectedValue}
      </button>
      <Dropdown
        DropdownItems={params.Options}
        DropdownHidden={params.DropdownHidden}
        OnSelect={params.OnSelect}
      />
    </div>
  );
}
