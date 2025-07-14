import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/')({
  beforeLoad: () => {
    throw redirect({
      from: "/edit",
      to: "/data",
    })
  }
})
