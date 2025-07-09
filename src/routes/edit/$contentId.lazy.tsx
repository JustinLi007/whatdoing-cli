import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { FetchContent, FetchUpdateContent } from '../../api/content';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import ButtonDropdown from '../../ui/ButtonDropdown';
import Input from '../../ui/Input';
import Card from '../../ui/Card';
import TextArea from '../../ui/TextArea';

export const Route = createLazyFileRoute('/edit/$contentId')({
  component: Edit,
})

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

function Edit() {
  const queryClient = useQueryClient();
  const navigate = useNavigate({
    from: `/edit/$contentId`,
  });
  const { contentId } = Route.useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["edit", contentId],
    queryFn: async () => {
      const data = await FetchContent({ content_id: contentId });
      if (data) {
        const content_kind = data.content.kind;
        switch (content_kind) {
          case "anime":
            setName(data.content.anime_name.name);
            setDescription(data.content.description ? data.content.description : "");
            setEpisodes(data.content.episodes ? data.content.episodes.toString() : "");
            setImageUrl(data.content.image_url ? data.content.image_url : "");
            setContentNameId(data.content.anime_name.id);
            setSelectedContentType("Anime");
            break;
          case 'manga':
            break;
        }
      }
      return data;
    },
  });

  const [contentTypeDropdownHidden, setContentTypeDropdownHidden] = useState(true);
  const [selectedContentType, setSelectedContentType] = useState("");
  const [name, setName] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [contentNameId, setContentNameId] = useState("");

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
    mutationFn: FetchUpdateContent,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries();
      navigate({
        to: `${data.next}`,
      });
    },
    onError: (err) => {
      console.log(`error: failed to update content: ${err}`);
    },
  });

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate({
      content_names_id: contentNameId,
      content_type: selectedContentType,
      content_id: contentId.trim(),
      description: description.trim(),
      image_url: imageUrl.trim(),
      episodes: parseInt(episodes),
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

  return (
    <>
      <div className={`py-4`}>
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
                id="description"
                value={description}
                label="Description"
                required={false}
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
