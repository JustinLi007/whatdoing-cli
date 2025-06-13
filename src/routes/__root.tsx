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
      Id: "1",
      Name: "Home",
      Path: "/home",
    },
    {
      Id: "2",
      Name: "New Content",
      Path: "/new-content",
    },
    {
      Id: "3",
      Name: "Sign Up",
      Path: "/signup",
    },
    {
      Id: "4",
      Name: "Login",
      Path: "/login",
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
            HeaderLink={{ Id: "whatdoing-header", Name: "Whatdoing", Path: "/" }}
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
