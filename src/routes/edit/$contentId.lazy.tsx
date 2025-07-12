import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { FetchContent, FetchUpdateContent } from '../../api/content';
import FormAnimeEdit from '../../ui/FormAnimeEdit';
import type { FormEvent } from 'react';

export const Route = createLazyFileRoute('/edit/$contentId')({
  component: Edit,
})

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
      return data;
    },
  });

  // TODO: fetch all names.

  const mutationAnime = useMutation({
    mutationFn: FetchUpdateContent,
    onSuccess(data) {
      queryClient.invalidateQueries();
      navigate({
        to: data.next,
      })
    },
    onError(error) {
      console.log(`error: failed to update anime entry: ${error}`);
    },
  });

  function handleOnSubmitAnime(event: FormEvent, params: UpdateAnimeRequest) {
    event.preventDefault();
    console.log(params);

    // mutationAnime.mutate({
    //   content_id: params.content_id,
    //   content_names_id: params.content_names_id,
    //   content_type: params.content_type,
    //   description: params.description,
    //   episodes: params.episodes,
    //   image_url: params.image_url,
    // });

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

  function getForm(content_data: GetContentResponse) {
    const content_kind = content_data.content.kind;

    switch (content_kind) {
      case "anime":
        const anime = content_data.content;
        return (
          <FormAnimeEdit
            content_type={content_kind}
            anime_id={anime.id}
            name={anime.anime_name.name}
            description={anime.description ? anime.description : ""}
            episodes={anime.episodes ? anime.episodes : 0}
            image_url={anime.image_url ? anime.image_url : ""}
            submit_fn={handleOnSubmitAnime}
            alt_names={[]}
          />
        );
      case "manga":
        return (
          <div>manga not implemented</div>
        );
      default:
        return (
          <div></div>
        );
    }
  }

  return (
    <>
      <div className={``}>
        {getForm(data)}
      </div>
    </>
  );
}
