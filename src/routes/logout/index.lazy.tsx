import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { local_storage_user_id } from '../../api/constants';

export const Route = createLazyFileRoute('/logout/')({
  component: RouteComponent,
})

function RouteComponent() {
  // TODO: api call

  localStorage.removeItem(local_storage_user_id);

  // temp shit
  const navigate = useNavigate()

  navigate({
    to: "/login",
  })

  return (
    <div>Hello "/logout/"!</div>
  );
}
