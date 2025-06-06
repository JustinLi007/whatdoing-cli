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
        <a
          href={params.Path}
          className={`inline-block content-center w-full h-full active:bg-gray-600`}
        >
          {params.Name}
        </a>
      </div>
    </>
  );
}
