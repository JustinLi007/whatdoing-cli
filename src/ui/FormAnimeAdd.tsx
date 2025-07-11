import { useState, type ChangeEvent, type FormEvent } from "react";
import Card from "./Card";
import Input from "./Input";
import TextArea from "./TextArea";


type Parameters = {
  submitFn: (event: FormEvent, params: CreateAnimeRequest) => void;
  contentType?: string;
  name?: string;
  episodes?: number;
  imageUrl?: string;
  description?: string;
}

export default function FormAnimeAdd(params: Parameters) {
  const contentType = params.contentType ? params.contentType : "Anime";
  const [name, setName] = useState<string | null>(params.name ? params.name : null);
  const [episodes, setEpisodes] = useState<number | null>(params.episodes ? params.episodes : null);
  const [imageUrl, setImageUrl] = useState<string | null>(params.imageUrl ? params.imageUrl : null);
  const [description, setDescription] = useState<string | null>(params.description ? params.description : null);

  function handleNameOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    setName(val);
  }

  function handleEpisodesOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    const num = parseInt(val);
    setEpisodes(num);
  }

  function handleImageUrlOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;
    setImageUrl(val);
  }

  function handleDescriptionOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLTextAreaElement)) {
      return;
    }
    const val = t.value;
    setDescription(val);
  }

  return (
    <>
      <div className={`py-4`}>
        <div className={`p-4`}>
          Type: {contentType}
        </div>
        <form onSubmit={
          (event) => {
            event.preventDefault();
            if (!name || !contentType) {
              return;
            }

            const reqEntry: CreateAnimeRequest = {
              name: name,
              content_type: contentType,
            }

            if (description) {
              reqEntry.description = description;
            }
            if (episodes) {
              reqEntry.episodes = episodes;
            }
            if (imageUrl) {
              reqEntry.image_url = imageUrl;
            }

            params.submitFn(event, reqEntry);
          }
        }>
          <div className={`flex flex-col flex-nowrap p-4 gap-4`}>
            <div>
              <Input
                id="name"
                type="text"
                value={name}
                label="Name"
                onChange={handleNameOnChange}
              />
            </div>
            <div>
              <Input
                id="episodes"
                type="number"
                value={episodes}
                label="Episodes"
                onChange={handleEpisodesOnChange}
              />
            </div>
            <div>
              <Input
                id="image"
                type="url"
                value={imageUrl}
                label="Image Url"
                onChange={handleImageUrlOnChange}
              />
            </div>
            <div>
              <TextArea
                id="description"
                value={description}
                label="Description"
                onChange={handleDescriptionOnChange}
              />
            </div>
            <div>
              <button type="submit" className={`border-1 border-gray-500 mt-4 p-3 w-full active:bg-gray-500`}>Submit Entry</button>
            </div>
          </div>
        </form>
        <div className={`p-4`}>
          <Card
            title={name}
            episode={episodes}
            contentLink=""
            description={description}
            imageSrc={imageUrl}
          />
        </div>
      </div>
    </>
  );
}
