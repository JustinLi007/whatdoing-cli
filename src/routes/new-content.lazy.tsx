import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import ButtonDropdown from '../ui/ButtonDropdown';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Card from '../ui/Card';
import { FetchCreateContent } from '../api/content';
import SearchDropdown from '../ui/SearchDropdown';

export const Route = createLazyFileRoute('/new-content')({
  component: NewContent,
})

const contentTypes = [
  "Anime",
  "Manga",
  "Manhwa",
]

const items: string[] = ["one", "two", "three", "four", "five"];

function NewContent() {
  const navigate = useNavigate({
    from: "/new-content",
  });
  const queryClient = useQueryClient();

  const [contentTypeDropdownHidden, setContentTypeDropdownHidden] = useState(true);
  const [selectedContentType, setSelectedContentType] = useState("");
  const [name, setName] = useState("");
  const [episodes, setEpisodes] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [searchDropdownHidden, setSearchDropdownHidden] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  function handleDocClick(event: MouseEvent) {
    const element = document.getElementById("new-content-search-dropdown");
    if (!element) {
      return;
    }

    const t = event.target;
    if (!element.contains(t)) {
      setSearchDropdownHidden(true);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleDocClick);
    return () => {
      document.removeEventListener("click", handleDocClick);
    }
  }, [])

  function handleSearchClick() {
    if (searchValue.length > 0) {
      setSearchDropdownHidden(false);
    }
  }

  function handleSearchOnChange(event: ChangeEvent) {
    const val = event.target.value;
    setSearchValue(val);

    if (val.trim().length === 0) {
      setSearchDropdownHidden(true);
    } else {
      setSearchDropdownHidden(false);
    }
  }

  function handleSearchDropdownOnSelect(value: string) {
    setSearchValue(value);
    setSearchDropdownHidden(true);
    // TODO: 
  }

  function handleContentTypeDropdownSelection(value: string) {
    setSelectedContentType(value);
    setContentTypeDropdownHidden(!contentTypeDropdownHidden);
  }

  function handleContentTypeDropdownToggle() {
    setContentTypeDropdownHidden(!contentTypeDropdownHidden);
  }

  function handleNameOnChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
    setName(val);
  }

  function handleEpisodesOnChange(event: ChangeEvent) {
    const val = event.target.value;
    setEpisodes(val);
  }

  function handleImageUrlOnChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
    setImageUrl(val);
  }

  function handleDescriptionOnChange(event: ChangeEvent) {
    // @ts-ignore
    const val = event.target.value;
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
    });
  }

  return (
    <>
      <div className={`py-4`}>

        <div className={`p-4`}>
          <SearchDropdown
            id={`new-content-search-dropdown`}
            searchValue={searchValue}
            dropdownHidden={searchDropdownHidden}
            dropdownItems={items}
            onChange={handleSearchOnChange}
            onClick={handleSearchClick}
            onSelect={handleSearchDropdownOnSelect}
          />
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className={`flex flex-col flex-nowrap p-4 gap-4`}>
            <div>
              <ButtonDropdown
                Name={`Content Type`}
                DropdownHidden={contentTypeDropdownHidden}
                SelectedValue={selectedContentType}
                OnClick={handleContentTypeDropdownToggle}
                OnSelect={handleContentTypeDropdownSelection}
                Options={contentTypes}
              />
            </div>
            <div>
              <Input
                Id="name"
                Type="text"
                Value={name}
                Label="Name"
                Required={true}
                OnChange={handleNameOnChange}
              />
            </div>
            <div>
              <Input
                Id="episodes"
                Type="number"
                Value={episodes}
                Label="Episodes"
                Required={false}
                OnChange={handleEpisodesOnChange}
              />
            </div>
            <div>
              <Input
                Id="image"
                Type="url"
                Value={imageUrl}
                Label="Image Url"
                Required={false}
                OnChange={handleImageUrlOnChange}
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
              <button type="submit" className={`border-1 border-gray-500 mt-4 p-3 w-full active:bg-gray-500`}>Create Entry</button>
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
