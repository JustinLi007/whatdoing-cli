import type { ChangeEvent } from "react";

interface Parameters {
  Id: string,
  Value: string,
  Label: string,
  Required: boolean,
  OnChange: (event: ChangeEvent) => void,
}

export default function TextArea(params: Parameters) {
  return (
    <>
      <label htmlFor={params.Id}>{params.Label}:</label>
      <textarea
        id={params.Id}
        name={params.Id}
        value={params.Value}
        className={`border-gray-500 border-1 py-1 px-3 outline-0 w-full min-h-32 max-h-64`}
        required={params.Required}
        onChange={params.OnChange}
      ></textarea>
    </>
  );
}
