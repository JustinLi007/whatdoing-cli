import { Link } from "@tanstack/react-router";
import type { MouseEvent } from "react";

type Parameters = {
  text: string;
  to: string;
  onClick?: (e: MouseEvent) => void;
}

export default function Option(params: Parameters) {
  return (
    <div className={`border border-gray-500`}>
      <Link
        className="inline-block w-full p-3 bg-gray-900 hover:bg-gray-500 active:bg-gray-700"
        to={params.to}
        activeProps={{ className: "font-bold border-2" }}
        activeOptions={{ exact: false }}
        onClick={(e) => {
          params.onClick ? params.onClick(e) : () => { return; };
        }}
      >{params.text}</Link>
    </div>
  );
}
