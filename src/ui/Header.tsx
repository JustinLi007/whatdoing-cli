import { Link } from "@tanstack/react-router"
import type { MouseEvent } from "react";

type Parameters = {
  title: string,
  onClick: (e: MouseEvent) => void,
}

export default function Header(params: Parameters) {
  return (
    <div className={`flex flex-row flex-nowrap justify-center relative p-6`}>
      <span>
        <Link to="/">{params.title}</Link>
      </span>
      <button
        type="button"
        onClick={(e) => {
          params.onClick(e);
        }}
        className={`absolute right-4 top-3 py-4 px-6 border-1 border-gray-500 active:bg-gray-600`}
      >X</button>
    </div>
  );
}
