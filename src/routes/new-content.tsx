import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new-content')({
  component: NewContent,
})

function NewContent() {
  return (
    <div>Hello "/new-content"!</div>
  );
}
