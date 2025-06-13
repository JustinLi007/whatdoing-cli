import { Link } from "@tanstack/react-router"
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

const getStarted: MenuItem = {
  Id: "",
  Name: "Get Started",
  Path: "/login",
}

function Index() {
  return (
    <div className={`flex flex-col flex-nowrap items-center`}>
      <div className={`py-12`}>
        <p>Some description...</p>
        <p>Some description...</p>
        <p>Some description...</p>
        <p>Some description...</p>
      </div>
      <div>
        <Link
          to={getStarted.Path}
          className={`inline-block content-center w-full h-full p-4 active:bg-gray-600 border-1 border-gray-500`}
          activeProps={{ className: `font-bold` }}
          activeOptions={{ exact: true }}
          onClick={() => { return; }}
        >{getStarted.Name}
        </Link>
      </div>
    </div>
  );
}
