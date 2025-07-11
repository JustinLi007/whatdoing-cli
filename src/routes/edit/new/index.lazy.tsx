import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FetchAllAnime, FetchCreateContent } from '../../../api/content';
import { newDocClickHandler } from '../../../utils/ui';
import ButtonDropdown from '../../../ui/ButtonDropdown';
import FormAnimeAdd from '../../../ui/FormAnimeAdd';

export const Route = createLazyFileRoute('/edit/new/')({
  component: EditNew,
})

// TODO: get form server??
const contentTypes: SuggestionItem[] = [
  {
    key: "1",
    kind: "anime",
    title: "anime",
  },
  {
    key: "2",
    kind: "manga",
    title: "manga",
  },
]

function EditNew() {
  const navigate = useNavigate({
    from: "/edit/new",
  });
  const queryClient = useQueryClient();

  // FIX: need new endpoint for names only.
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
  const [selectedContentType, setSelectedContentType] = useState<ContentKinds>("anime");

  const handleDocClickContentType = newDocClickHandler("new-content-type-dropdown", setContentTypeDropdownHidden);

  useEffect(() => {
    document.addEventListener("click", handleDocClickContentType);
    return () => {
      document.removeEventListener("click", handleDocClickContentType);
    }
  }, [])

  function handleContentTypeDropdownSelection(value: SuggestionItem) {
    setSelectedContentType(value.title);
    setContentTypeDropdownHidden(!contentTypeDropdownHidden);
  }

  function handleContentTypeDropdownToggle() {
    setContentTypeDropdownHidden(!contentTypeDropdownHidden);
  }

  const mutationAnime = useMutation({
    mutationFn: FetchCreateContent,
    onSuccess(data) {
      queryClient.invalidateQueries();
      navigate({
        to: data.next,
      })
    },
    onError(error) {
      console.log(`error: failed to create anime entry: ${error}`);
    },
  })
  function handleOnSubmitAnime(event: FormEvent, params: CreateAnimeRequest) {
    event.preventDefault();
    mutationAnime.mutate({
      content_type: params.content_type,
      name: params.name,
      content_id: params.content_id,
      description: params.description,
      episodes: params.episodes,
      image_url: params.image_url,
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

  function getForm(content_type: ContentKinds) {
    switch (content_type) {
      case "anime":
        return (
          <FormAnimeAdd
            submitFn={handleOnSubmitAnime}
          />
        );
      case "manga":
        return (
          <div>
            {content_type} not implemented.
          </div>
        );
      default:
        return <div></div>
    }
  }

  return (
    <>
      <div className={`px-4`}>
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
      </div>
      {getForm(selectedContentType)}
    </>
  );
}
