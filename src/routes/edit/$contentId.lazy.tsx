import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import FormAnimeEdit from '../../ui/FormAnimeEdit';
import type { FormEvent } from 'react';
import { FetchAnimeById, FetchUpdateAnime } from '../../api/anime';

export const Route = createLazyFileRoute('/edit/$contentId')({
  component: Edit,
})

function Edit() {
  const queryClient = useQueryClient();
  const navigate = useNavigate({
    from: `/edit/$contentId`,
  });
  const { contentId } = Route.useParams();
  const { isPending: isPendingFetchContent, isError: isErrorFetchContent, data: dataFetchContent, error: errorFetchContent } = useQuery({
    queryKey: ["edit", "content", contentId],
    queryFn: async () => {
      const data = await FetchAnimeById({ content_id: contentId });
      return data;
    },
  });

  const mutationAnime = useMutation({
    mutationFn: FetchUpdateAnime,
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

    mutationAnime.mutate({
      content_id: params.content_id,
      content_names_id: params.content_names_id,
      content_type: params.content_type,
      description: params.description,
      episodes: params.episodes,
      image_url: params.image_url,
      alternative_names: params.alternative_names,
    });
  }

  if (isPendingFetchContent) {
    return (
      <div>Loading...</div>
    );
  }
  if (isErrorFetchContent) {
    return (
      <div>Something went wrong...{errorFetchContent.message}</div>
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
            alt_names={anime.alternative_names}
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
        {getForm(dataFetchContent)}
      </div>
    </>
  );
}
