import type { ChangeEvent, HTMLInputTypeAttribute } from "react";

type Parameters = {
  type: HTMLInputTypeAttribute;
  id: string;
  label: string;
  value?: string | number | null;
  required?: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent) => void;
}

export default function Input(params: Parameters) {
  const value = params.value ? params.value : "";
  const required = params.required ? params.required : false;
  const disabled = params.disabled ? params.disabled : false;

  return (
    <div className="flex flex-col flex-nowrap justify-center">
      <label htmlFor={params.id}>{params.label}{params.label ? ":" : ""}</label>
      <input
        className={`border-gray-500 border-1 py-1 px-3 outline-0 w-full`}
        id={params.id}
        name={params.id}
        type={params.type}
        onChange={(e) => {
          params.onChange(e);
        }}
        value={value}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
