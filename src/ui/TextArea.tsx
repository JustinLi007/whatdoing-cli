import type { ChangeEvent } from "react";

type Parameters = {
  id: string;
  label: string;
  value?: string | number | null;
  required?: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent) => void;
}

export default function TextArea(params: Parameters) {
  const value = params.value ? params.value : "";
  const required = params.required ? params.required : false;
  const disabled = params.disabled ? params.disabled : false;

  return (
    <>
      <label htmlFor={params.id}>{params.label}:</label>
      <textarea
        className={`border-gray-500 border-1 py-1 px-3 outline-0 w-full min-h-32 max-h-64`}
        id={params.id}
        name={params.id}
        onChange={params.onChange}
        value={value}
        required={required}
        disabled={disabled}
      ></textarea>
    </>
  );
}
