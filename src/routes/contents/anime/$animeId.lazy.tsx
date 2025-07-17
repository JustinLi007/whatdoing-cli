import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { FetchAnimeById } from '../../../api/anime';

export const Route = createLazyFileRoute('/contents/anime/$animeId')({
  component: ContentAnime,
})

function ContentAnime() {
  const { animeId } = Route.useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["contents", "anime", animeId],
    queryFn: async () => {
      const resp = await FetchAnimeById({ anime_id: animeId });
      return resp;
    }
  });

  if (isPending) {
    return (
      <div>Loading...</div>
    );
  }
  if (isError) {
    return (
      <div>something went wrong...{error.message}</div>
    );
  }

  return (
    <div className={`flex flex-col flex-nowrap gap-4 p-4`}>

      <div className={`text-center font-bold text-lg`}>{data.anime.anime_name.name}</div>

      <div className={`flex flex-col flex-nowrap items-center gap-4`}>
        <div className={`inline-block`}>
          <img
            className={``}
            src={`${data.anime.image_url ? data.anime.image_url : undefined}`}
          />
        </div>
        <div className={`inline-block h-48 overflow-y-scroll`}>{data.anime.description}</div>
      </div>

      <div className={`flex flex-col flex-nowrap gap-1.5`}>
        <div className={`font-bold text-center`}>Information</div>

        <div>
          <div className={`font-bold`}>Alternative Names</div>
          <div>
            <ul>
              {data.anime.alternative_names.map((name) => {
                return (<li key={name.id}>{name.name}</li>);
              })}
            </ul>
          </div>
        </div>

        <div>
          <span className={`font-bold`}>Episodes: </span>
          <span>{data.anime.episodes}</span>
        </div>
      </div>

    </div>
  );
}
