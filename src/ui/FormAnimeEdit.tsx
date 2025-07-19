import { useState, type ChangeEvent, type FormEvent } from "react";
import Card from "./Card";
import Input from "./Input";
import TextArea from "./TextArea";
import InputTable from "./InputTable";

type Parameters = {
  submit_fn: (event: FormEvent, params: UpdateAnimeRequest) => void;
  content_type: string;
  name: string;
  anime_id: string;
  episodes: number;
  image_url: string;
  description: string;
  alt_names: AnimeName[];
}

export default function FormAnimeEdit(params: Parameters) {
  const content_type = params.content_type;
  const anime_id = params.anime_id;
  const [name, setName] = useState<string>(params.name);
  const [new_alt_names, set_new_alt_names] = useState<string[]>([]);
  const [name_id, setNameId] = useState<string>(getNameId(params.name));
  const [episodes, setEpisodes] = useState<number>(params.episodes);
  const [image_url, setImageUrl] = useState<string>(params.image_url);
  const [description, setDescription] = useState<string>(params.description);

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

  function getNameId(target_name: string) {
    let result = "";
    for (const name of params.alt_names) {
      if (name.name === target_name) {
        result = name.id;
        break;
      }
    }
    return result;
  }

  function getName(target_id: string) {
    let result = "";
    for (const name of params.alt_names) {
      if (name.id === target_id) {
        result = name.name;
        break;
      }
    }
    return result;
  }

  function handleTableInputRetrieve(input_values: string[]) {
    const no_empty_values = input_values.filter((value) => {
      return value.trim().length !== 0;
    });
    set_new_alt_names(no_empty_values);
  }

  return (
    <>
      <div className={`py-4`}>
        <div className={`p-4`}>
          Type: {content_type}
        </div>
        <form onSubmit={
          (event) => {
            event.preventDefault();

            const reqEntry: UpdateAnimeRequest = {
              content_type: content_type,
              content_id: anime_id,
              content_names_id: name_id,
              description: description,
              episodes: episodes,
              image_url: image_url,
              alternative_names: new_alt_names,
            }

            params.submit_fn(event, reqEntry);
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
                disabled={true}
              />
              <div>
                {params.alt_names.map((name) => {
                  // TODO: set name id on click and set name base on selection.
                  return (
                    <div
                      key={name.id}
                      onClick={() => {
                        setNameId(name.id);
                        setName(getName(name.id));
                      }}
                    >{name.name}</div>
                  );
                })}
              </div>
              <div>
                <InputTable
                  title="Alternative Names"
                  retrieve_fn={handleTableInputRetrieve}
                />
              </div>
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
                value={image_url}
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
            imageSrc={image_url}
          />
        </div>
      </div>
    </>
  );
}
