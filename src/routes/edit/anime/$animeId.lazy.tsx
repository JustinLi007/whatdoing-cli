import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import FormAnimeEdit from '../../../ui/FormAnimeEdit';
import type { FormEvent } from 'react';
import { FetchAnimeById, FetchUpdateAnime } from '../../../api/anime';

export const Route = createLazyFileRoute('/edit/anime/$animeId')({
  component: EditAnime,
})

function EditAnime() {
  const queryClient = useQueryClient();
  const navigate = useNavigate({
    from: `/edit/anime/$animeId`,
  });
  const { animeId } = Route.useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["edit", "anime", animeId],
    queryFn: async () => {
      const data = await FetchAnimeById({ anime_id: animeId });
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
      <div className={``}>
        <FormAnimeEdit
          content_type={data.anime.kind}
          anime_id={data.anime.id}
          name={data.anime.anime_name.name}
          description={data.anime.description ? data.anime.description : ""}
          episodes={data.anime.episodes ? data.anime.episodes : 0}
          image_url={data.anime.image_url ? data.anime.image_url : ""}
          submit_fn={handleOnSubmitAnime}
          alt_names={data.anime.alternative_names}
        />
      </div>
    </>
  );
}
