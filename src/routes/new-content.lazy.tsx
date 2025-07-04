import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import ButtonDropdown from '../ui/ButtonDropdown';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Card from '../ui/Card';
import { FetchAllAnime, FetchCreateContent } from '../api/content';
import SearchDropdown from '../ui/SearchDropdown';
import { newDocClickHandler } from '../utils/ui';

export const Route = createLazyFileRoute('/new-content')({
  component: NewContent,
})

// TODO: get form server??
const contentTypes: SuggestionItem[] = [
  {
    key: "1",
    kind: "anime",
    title: "Anime",
  },
  {
    key: "2",
    kind: "manga",
    title: "Manga",
  },
]

function NewContent() {
  const navigate = useNavigate({
    from: "/new-content",
  });
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["content_list"],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await FetchAllAnime();
      return data;
    },
    staleTime: 1000 * 60,
  });

  const [contentTypeDropdownHidden, setContentTypeDropdownHidden] = useState(true);
  const [selectedContentType, setSelectedContentType] = useState("");
  const [name, setName] = useState("");
  const [contentId, setContentId] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [searchDropdownHidden, setSearchDropdownHidden] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const handleDocClickSearch = newDocClickHandler("new-content-search-dropdown", setSearchDropdownHidden);
  const handleDocClickContentType = newDocClickHandler("new-content-type-dropdown", setContentTypeDropdownHidden);

  useEffect(() => {
    document.addEventListener("click", handleDocClickSearch);
    document.addEventListener("click", handleDocClickContentType);
    return () => {
      document.removeEventListener("click", handleDocClickSearch);
      document.removeEventListener("click", handleDocClickContentType);
    }
  }, [])

  function handleSearchClick() {
    if (searchValue.length > 0) {
      setSearchDropdownHidden(false);
    }
  }

  function handleSearchOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;

    setSearchValue(val);

    if (val.trim().length === 0) {
      setSearchDropdownHidden(true);
    } else {
      setSearchDropdownHidden(false);
    }
  }

  function handleSearchDropdownOnSelect(value: SuggestionItem) {
    // TODO:
    const val = value.title;
    setSearchValue(val);
    setName(val);
    setSearchDropdownHidden(true);
    setContentId(value.key);
  }

  function handleContentTypeDropdownSelection(value: SuggestionItem) {
    setSelectedContentType(value.title);
    setContentTypeDropdownHidden(!contentTypeDropdownHidden);
  }

  function handleContentTypeDropdownToggle() {
    setContentTypeDropdownHidden(!contentTypeDropdownHidden);
  }

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
    setEpisodes(val);
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

  const mutation = useMutation({
    mutationFn: FetchCreateContent,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries();
      navigate({
        to: `${data.next}`,
      });
    },
    onError: (err) => {
      console.log(`error: failed to create content: ${err}`);
    },
  });

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate({
      name: name,
      content_type: selectedContentType,
      content_id: contentId.trim() === "" ? undefined : contentId,
      description: description.trim() === "" ? undefined : description,
      image_url: imageUrl.trim() === "" ? undefined : imageUrl,
      episodes: episodes.trim() === "" ? undefined : parseInt(episodes),
    });
  }

  if (isPending) {
    return (
      <div>Loading...</div>
    );
  }
  if (isError) {
    return (
      <div>Something went wrong...{error.message}</div>
    );
  }

  function toSuggestionItem(value: ContentTypes): SuggestionItem | null {
    switch (value.kind) {
      case "anime":
        return {
          key: value.id,
          kind: "anime",
          title: value.anime_name.name,
          description: value.description,
        }
      case "manga":
        return {
          key: value.id,
          kind: "anime",
          title: "manga not implemented",
        }
      default:
        return null;
    }
  }

  return (
    <>
      <div className={`py-4`}>

        <div className={`relative p-4`}>
          <SearchDropdown
            id={`new-content-search-dropdown`}
            searchValue={searchValue}
            dropdownHidden={searchDropdownHidden}
            dropdownItems={
              data.anime_list.map((value) => {
                return toSuggestionItem(value);
              }).filter((value) => {
                return value !== null;
              })
            }
            onChange={handleSearchOnChange}
            onClick={handleSearchClick}
            onSelect={handleSearchDropdownOnSelect}
          />
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className={`flex flex-col flex-nowrap p-4 gap-4`}>
            <div className={`relative w-max`}>
              <ButtonDropdown
                id={`new-content-type-dropdown`}
                name={`Content Type`}
                dropdownHidden={contentTypeDropdownHidden}
                selectedValue={selectedContentType}
                onClick={handleContentTypeDropdownToggle}
                onSelect={handleContentTypeDropdownSelection}
                dropdownItems={contentTypes}
              />
            </div>
            <div>
              <Input
                id="name"
                type="text"
                value={name}
                label="Name"
                required={true}
                onChange={handleNameOnChange}
                disabled={true}
              />
            </div>
            <div>
              <Input
                id="episodes"
                type="number"
                value={episodes}
                label="Episodes"
                required={false}
                onChange={handleEpisodesOnChange}
              />
            </div>
            <div>
              <Input
                id="image"
                type="url"
                value={imageUrl}
                label="Image Url"
                required={false}
                onChange={handleImageUrlOnChange}
              />
            </div>
            <div>
              <TextArea
                Id="description"
                Value={description}
                Label="Description"
                Required={false}
                OnChange={handleDescriptionOnChange}
              />
            </div>
            <div>
              <button type="submit" className={`border-1 border-gray-500 mt-4 p-3 w-full active:bg-gray-500`}>Submit Entry</button>
            </div>
          </div>
        </form>
        <div className={`p-4`}>
          <Card
            Title={name}
            Episode={episodes}
            ContentLink=""
            Description={description}
            ImageSrc={imageUrl}
          />
        </div>
      </div>
    </>
  );
}
