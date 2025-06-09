interface Parameters {
  Title: string,
  Episode: number,
  Description: string,
  ImageSrc: string,
  ContentLink: string,
}

export default function Card(params: Parameters) {
  let imageSrc: string | undefined = undefined;
  if (params.ImageSrc.trim() !== "") {
    imageSrc = params.ImageSrc;
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
                href={params.ContentLink}
                target="_blank"
                className={`text-lg ${params.ContentLink.trim() === "" ? "pointer-events-none" : ""}`}
              >{params.Title}
              </a>
            </div>
            <div>
              {params.Episode}
            </div>
            <div>
              {params.Description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
