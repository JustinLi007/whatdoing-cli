import { useEffect } from "react";
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
      Path: "/",
    },
    {
      Id: "2",
      Name: "Start New",
      Path: "/",
    },
    {
      Id: "3",
      Name: "Settings",
      Path: "/",
    },
  ];

  return (
    <>
      <div
        className={``}
      >
        <Menu MenuItems={menuItems} />
      </div>
    </>
  );
}

export default App
