import { createFileRoute, Navigate } from '@tanstack/react-router'
import { FetchCheckSession } from '../api/users';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    try {
      const resp = await FetchCheckSession();
      return resp;
    } catch (err) {
      return null;
    }
  }
})

function RouteComponent() {
  const user = Route.useLoaderData();

  if (!user) {
    return (
      <Navigate to="/getstarted" />
    );
  }

  return (
    <Navigate to="/library" />
  );
}
