import { useState } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Menu from "../ui/Menu";
import Header from "../ui/Header";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Home",
      path: "/home",
    },
    {
      id: "2",
      name: "New Content",
      path: "/new-content",
    },
    {
      id: "3",
      name: "Sign Up",
      path: "/signup",
    },
    {
      id: "4",
      name: "Login",
      path: "/login",
    },
    {
      id: "5",
      name: "Data",
      path: "/data",
    },
  ];

  const [menuHidden, setMenuHidden] = useState(true);

  function handleBtnClick() {
    setMenuHidden(!menuHidden);
  }

  return (
    <>
      <div className={`flex flex-col h-dvh`}>
        <header className={`shrink-0`}>
          <Header
            HeaderLink={{ id: "whatdoing-header", name: "Whatdoing", path: "/" }}
            BtnOnClick={handleBtnClick}
          />
          <div
            className={`absolute left-0 right-0 top-auto bottom-auto`}
          >
            <Menu
              MenuItems={menuItems}
              MenuHidden={menuHidden}
              OnClick={handleBtnClick}
            />
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
