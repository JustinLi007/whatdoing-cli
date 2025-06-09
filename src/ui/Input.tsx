import type { ChangeEvent } from "react";

interface Parameters {
  Type: string,
  Id: string,
  Value: string,
  Label: string,
  Required: boolean,
  OnChange: (event: ChangeEvent) => void,
}

export default function Input(params: Parameters) {
  return (
    <>
      <label htmlFor={params.Id}>{params.Label}:</label>
      <input
        id={params.Id}
        name={params.Id}
        type={params.Type}
        value={params.Value}
        className={`border-gray-500 border-1 py-1 px-3 outline-0 w-full`}
        required={params.Required}
        onChange={params.OnChange}
      />
    </>
  );
}
