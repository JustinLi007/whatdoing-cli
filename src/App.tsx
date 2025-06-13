import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import NotFound from "./NotFound";
import Error from "./Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({
  routeTree: routeTree,
  defaultPreload: "viewport",
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: Error,
})

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} ></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App
