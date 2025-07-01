import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contents/$contentId')({
  component: Content,
})

function Content() {
  const { contentId } = Route.useParams();
  // set loader in Route to the api fetchContent function
  // const content = Route.useLoaderData();

  // TODO: content detail page, can update and delete content here.

  return (
    <>
      <div>Content ID: {contentId} </div>
    </>
  );
}

