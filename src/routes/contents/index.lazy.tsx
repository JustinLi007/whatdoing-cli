import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { FetchAllAnime } from '../../api/content';
import Card from '../../ui/Card';

export const Route = createLazyFileRoute('/contents/')({
  component: Contents,
})

function Contents() {
  // TODO: display all contents, have pagination.

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["contentList"],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await FetchAllAnime();
      return data;
    },
  });

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
      <div>Hello "/content/contents"!</div>
      <div>
        {data.anime_list.map((value) => {
          return (
            <Card
              key={value.id}
              Title={value.anime_name.name}
              Episode={value.episodes}
              Description={value.description}
              ContentLink={`/contents/${value.id}`}
              ImageSrc={""}
            />
          );
        })}
      </div>
    </>
  );
}
