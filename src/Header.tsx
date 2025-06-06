interface Parameters {
  Name: string
  Path: string
}

export default function Header(params: Parameters) {
  function handleClick() {
    console.log("clicked");
  }

  const btnValue = "X";

  return (
    <div
      className={`flex flex-row flex-nowrap justify-center relative p-6`}
    >
      <span>
        <a
          href={params.Path}
        >
          {params.Name}
        </a>
      </span>
      <button
        onClick={handleClick}
        className={`absolute right-4 top-3 py-4 px-6 border-1 border-gray-500 active:bg-gray-600`}
      >
        {btnValue}
      </button>
    </div>
  );
}
