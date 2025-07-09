import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/edit/new/')({
  component: EditNew,
})

function EditNew() {
  return <div>Hello "/edit/new/"!</div>
}
