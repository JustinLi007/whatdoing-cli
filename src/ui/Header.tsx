import { Link } from "@tanstack/react-router"

interface Parameters {
  HeaderLink: MenuItem,
  BtnOnClick: () => void,
}

export default function Header(params: Parameters) {
  const btnValue = "X";

  return (
    <div
      className={`flex flex-row flex-nowrap justify-center relative p-6`}
    >
      <span>
        <Link
          to={params.HeaderLink.Path}
          className={``}
        >
          {params.HeaderLink.Name}
        </Link>
      </span>
      <button
        type="button"
        onClick={params.BtnOnClick}
        className={`absolute right-4 top-3 py-4 px-6 border-1 border-gray-500 active:bg-gray-600`}
      >
        {btnValue}
      </button>
    </div>
  );
}
