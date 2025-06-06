import { useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";

function App() {
  function handleClick(event: MouseEvent) {
    console.log(event);
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  const menuItems: MenuItem[] = [
    {
      Id: "1",
      Name: "Home",
      Path: "/home",
    },
    {
      Id: "2",
      Name: "Start New",
      Path: "/startnew",
    },
    {
      Id: "3",
      Name: "Settings",
      Path: "/settings",
    },
  ];

  return (
    <>
      <div
        className={``}
      >
        <Header Name="Whatdoing" Path="/" />
        <Menu MenuItems={menuItems} />
      </div>
    </>
  );
}

export default App
