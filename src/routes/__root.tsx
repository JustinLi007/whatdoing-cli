import { useEffect, useState } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Menu from "../ui/Menu";
import Header from "../ui/Header";
import { FetchCheckSession } from "../api/users";
import { newDocClickHandler } from "../utils/ui";

export const Route = createRootRoute({
  component: RootComponent,
  loader: async () => {
    try {
      const resp = await FetchCheckSession();
      return resp;
    } catch (err) {
      return null;
    }
  },
})

function RootComponent() {
  const user = Route.useLoaderData();
  const [menu_hidden, setMenuHidden] = useState<boolean>(true);

  const toggleMenu = newDocClickHandler("root-menu", (value) => {
    setMenuHidden(value);
  });

  useEffect(() => {
    document.addEventListener("click", toggleMenu);
    return () => {
      document.removeEventListener("click", toggleMenu);
    }
  }, []);

  function handleMenuBtnOnClick() {
    setMenuHidden(!menu_hidden);
  }

  return (
    <>
      <div className={`flex flex-col h-dvh`}>
        <header id="root-menu" className={`shrink-0`}>
          <Header title="Whatdoing" onClick={handleMenuBtnOnClick} />
          <div className={`absolute left-0 right-0 top-auto bottom-auto z-10`}>
            <Menu login={user ? true : false} hidden={menu_hidden} onClick={(_) => {
              setMenuHidden(true);
            }} />
          </div>
        </header>

        <main className={`flex-[1_1_auto] overflow-y-auto`}>
          <Outlet />
        </main>

        <footer className={`shrink-0`}>
          asdfasdf
        </footer>
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  )
}
