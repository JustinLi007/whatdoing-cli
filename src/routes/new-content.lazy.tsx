import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/new-content')({
  component: NewContent,
})

function NewContent() {
  return (
    <div>Hello "/new-content"!</div>
  );
}
