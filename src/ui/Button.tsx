import { type MouseEvent } from "react";

type Parameters = {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick: (event: MouseEvent, ...args: string[]) => void;
}

export default function Button(params: Parameters) {
  const disabled = params.disabled ?? false;
  const type = params.type ? params.type : "button";
  return (
    <button
      className={`border-1 border-gray-500 p-3 w-full ${disabled ? "" : "active:bg-gray-500"}`}
      onClick={(e) => {
        params.onClick(e, params.text);
      }}
      disabled={disabled}
      type={type}
    >{params.text}</button>
  );
}
