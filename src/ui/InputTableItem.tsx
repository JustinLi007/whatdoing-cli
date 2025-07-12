import type { ChangeEvent, MouseEvent } from "react";

type Parameters = {
  value: string;
  index: number;
  onChange: (event: ChangeEvent, index: number) => void;
  onClick: (event: MouseEvent, index: number) => void;
}

export default function InputTableItem(params: Parameters) {
  const idx = params.index;
  return (
    <div className={`flex flex-row flex-nowrap items-center justify-items-center`}>
      <div className="w-full">
        <input
          className={`border-gray-500 border-1 py-1 px-3 outline-0 w-full`}
          type="text"
          value={params.value}
          onChange={(event) => {
            params.onChange(event, idx);
          }}
        />
      </div>
      <div>
        <button
          className={`border-1 border-gray-500 py-1 px-3 w-full active:bg-gray-500`}
          type="button"
          onClick={(event) => {
            params.onClick(event, idx);
          }}
        >Remove</button>
      </div>
    </div>
  )
}
