import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, Navigate } from '@tanstack/react-router'
import { FetchLogout } from '../../api/users';
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/logout/')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    mutation.mutate();
    return () => {
    }
  }, []);

  const mutation = useMutation({
    mutationFn: FetchLogout,
    onSuccess() { },
    onError() { },
  });

  return (
    <Navigate to="/login" />
  );
}
