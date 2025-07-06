interface Parameters {
  title: string;
  episode: string;
  description: string;
  imageSrc: string;
  contentLink: string;
}

export default function Card(params: Parameters) {
  let imageSrc: string | undefined = undefined;
  if (params.imageSrc.trim() !== "") {
    imageSrc = params.imageSrc;
  }

  return (
    <div className={`outline-1 outline-gray-500 border-gray-500 shadow shadow-gray-500`}>
      <div className={`aspect-video w-full`}>
        <div className={` flex flex-row flex-nowrap w-full h-full`}>
          <div className={`w-2/5`}>
            <img
              src={imageSrc}
              className={`object-center object-contain h-full w-full aspect-[9/16]`}
            />
          </div>
          <div className={`p-2.5 w-3/5 overflow-auto`}>
            <div className={`font-bold`}>
              <a
                href={params.contentLink}
                target="_blank"
                className={`text-lg ${params.contentLink.trim() === "" ? "pointer-events-none" : ""}`}
              >{params.title}
              </a>
            </div>
            <div>
              {params.episode}
            </div>
            <div>
              {params.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
