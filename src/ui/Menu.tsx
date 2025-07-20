import type { MouseEvent } from "react";
import Option from "./Option";

type Paramaters = {
  id?: string;
  hidden: boolean;
  login: boolean;
  onClick: (e: MouseEvent) => void;
}

export default function Menu(params: Paramaters) {
  return (
    <div
      id={params.id}
      className={`relative flex flex-col flex-nowrap gap-2 p-3 ${params.hidden ? "hidden" : ""} h-full`}>
      <Option text="Library" to="/library/started" onClick={params.onClick} />
      <Option text="Search" to="/search" onClick={params.onClick} />
      <Option text="Data" to="/data" onClick={params.onClick} />
      {params.login ? <Option text="Logout" to="/logout" onClick={params.onClick} /> : <Option text="Login" to="/login" onClick={params.onClick} />}
      <div className="absolute bg-zinc-600 top-0 left-0 right-0 bottom-0 opacity-75 -z-10"></div>
    </div>
  );
}
