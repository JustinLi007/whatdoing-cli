import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { FetchAllAnime, FetchCreateAnime } from '../../../../api/anime';
import { type FormEvent } from 'react';
import FormAnimeAdd from '../../../../ui/FormAnimeAdd';

export const Route = createLazyFileRoute('/edit/new/anime/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["content_list"],
    queryFn: async () => {
      const data = await FetchAllAnime();
      return data;
    },
  });

  const mutationAnime = useMutation({
    mutationFn: FetchCreateAnime,
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
    console.log(params);
    mutationAnime.mutate({
      content_type: params.content_type,
      name: params.name,
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

  return (
    <>
      <FormAnimeAdd
        submit_fn={handleOnSubmitAnime}
        content_type="anime"
      />
    </>
  );
}
