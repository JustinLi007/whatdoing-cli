import type { ChangeEvent } from "react";

interface Parameters {
  type: string;
  id: string;
  value: string | number;
  label: string;
  required: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent) => void;
}

export default function Input(params: Parameters) {
  return (
    <>
      <label htmlFor={params.id}>{params.label}:</label>
      <input
        id={params.id}
        name={params.id}
        type={params.type}
        value={params.value}
        className={`border-gray-500 border-1 py-1 px-3 outline-0 w-full`}
        required={params.required}
        onChange={params.onChange}
        disabled={params.disabled}
      />
    </>
  );
}
