import { Link } from "@tanstack/react-router"

type Paramaters = {
  name: string;
  path: string;
  onClick: () => void;
}

export default function OptionSquare(params: Paramaters) {
  return (
    <>
      <div
        className={
          `aspect-square text-center content-center border-1 border-gray-500
bg-gray-800`
        }
      >
        <Link
          to={params.path}
          className={`inline-block content-center w-full h-full active:bg-gray-600`}
          activeProps={{ className: `font-bold` }}
          activeOptions={{ exact: true }}
          onClick={params.onClick}
        >{params.name}
        </Link>
      </div>
    </>
  );
}
