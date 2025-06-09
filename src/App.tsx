import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import NotFound from "./NotFound";
import Error from "./Error";

const router = createRouter({
  routeTree: routeTree,
  defaultPreload: "viewport",
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: Error,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <RouterProvider router={router} ></RouterProvider>
  );
}

export default App
