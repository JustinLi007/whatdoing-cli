type Parameters = {
  title?: string | null;
  episode?: number | string | readonly string[] | null;
  description?: string | null;
  imageSrc?: string | null;
  contentLink?: string | null;
}

export default function Card(params: Parameters) {
  let imageSrc: string | undefined = undefined;
  if (params.imageSrc && params.imageSrc.trim() !== "") {
    imageSrc = params.imageSrc;
  }
  const title = params.title ? params.title : "";
  const episode = params.episode ? params.episode : "";
  const description = params.description ? params.description : "";
  const contentLink = params.contentLink ? params.contentLink : "";

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
          <div className={`relative w-3/5 overflow-auto`}>
            <div>
              <div className={`sticky left-0 top-0 bg-neutral-800 p-2`}>
                <div className={`font-bold`}>
                  <a
                    href={contentLink}
                    target="_blank"
                    className={`text-lg ${contentLink.trim() === "" ? "pointer-events-none" : ""}`}
                  >{title}</a>
                </div>
                <div>{episode}</div>
              </div>
              <div className={`p-2`}>{description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
