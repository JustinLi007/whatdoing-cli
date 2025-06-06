import { Link } from "@tanstack/react-router"

interface Paramaters {
  Name: string
  Path: string
}

export default function Option(params: Paramaters) {
  return (
    <>
      <div
        className={
          `aspect-square text-center content-center border-1 border-gray-500
bg-gray-800`
        }
      >
        <Link
          to={params.Path}
          className={`inline-block content-center w-full h-full active:bg-gray-600`}
          activeProps={{ className: `font-bold` }}
          activeOptions={{ exact: true }}
        >
          {params.Name}
        </Link>
      </div>
    </>
  );
}
