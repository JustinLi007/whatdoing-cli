import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/content/contents')({
  component: Contents,
})

function Contents() {
  // TODO: display all contents, have pagination.
  return (
    <>
      <div>Hello "/content/contents"!</div>
    </>
  );
}
