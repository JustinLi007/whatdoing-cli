import { useState } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Menu from "../ui/Menu";
import Header from "../ui/Header";
import { local_storage_user_id } from "../api/constants";

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
      id: "4",
      name: "Data",
      path: "/data",
    },
    {
      id: "5",
      name: "Search",
      path: "/search"
    },
    {
      id: "3",
      name: "Login",
      path: "/login",
    },
    {
      id: "6",
      name: "Logout",
      path: "/logout"
    },
  ];

  const [menuHidden, setMenuHidden] = useState(true);

  function handleBtnClick() {
    setMenuHidden(!menuHidden);
  }

  function getMenuItems(params: MenuItem[]) {
    const params_copy = params.slice();
    const user_id = localStorage.getItem(local_storage_user_id);

    const parse_item = (item: MenuItem, index: number): MenuItem => {
      switch (item.name) {
        case "Home":
          const base = {
            id: index.toString(),
            name: item.name,
            path: item.path,
          }
          if (!user_id) {
            return base;
          }
          base.path = `${base.path}/${user_id}`;
          return base;
        default:
          return {
            id: index.toString(),
            name: item.name,
            path: item.path,
          }
      }
    }

    const menu_items: MenuItem[] = [];
    for (let i = 0; i < params_copy.length; i++) {
      const cur = params_copy[i];
      if (cur.name === "Login" && user_id) {
        continue;
      }
      if (cur.name === "Logout" && !user_id) {
        continue;
      }
      menu_items.push(parse_item(cur, i));
    }

    return menu_items;
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
            className={`absolute left-0 right-0 top-auto bottom-auto bg-neutral-700 z-10`}
          >
            <Menu
              menuItems={getMenuItems(menuItems)}
              menuHidden={menuHidden}
              onClick={handleBtnClick}
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
