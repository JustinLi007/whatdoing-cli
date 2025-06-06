import { Outlet, createRootRoute } from "@tanstack/react-router"
import Menu from "../Menu";
import Header from "../Header";
import { useState } from "react";

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
  ];

  const [menuHidden, setMenuHidden] = useState(true);

  function handleBtnClick() {
    setMenuHidden(!menuHidden);
  }

  return (
    <>
      <div className={``}>
        <Header
          HeaderLink={{ Id: "whatdoing-header", Name: "Whatdoing", Path: "/" }}
          BtnOnClick={handleBtnClick}
        />
        <div
          className={`absolute left-0 right-0 top-auto bottom-auto`}
        >
          <Menu MenuItems={menuItems} MenuHidden={menuHidden} />
        </div>
      </div>
      <Outlet />
    </>
  )
}
