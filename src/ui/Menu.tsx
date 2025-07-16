import OptionSquare from "./OptionSquare";

type Paramaters = {
  menuItems: MenuItem[],
  menuHidden: boolean,
  onClick: () => void,
}

export default function Menu(params: Paramaters) {
  return (
    <div
      className={`grid grid-cols-2 landscape:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 p-2
${params.menuHidden ? "hidden" : ""}`
      }
    >
      {params.menuItems.map((value) => {
        let pathVal = value.path;
        if (value.name === "Home") {
          const userId = localStorage.getItem("whatdoing-user-id");
          if (userId) {
            pathVal = `${value.path}/${userId}`;
          }
        }

        return (
          <OptionSquare
            key={value.id}
            name={value.name}
            path={pathVal}
            onClick={params.onClick}
          />
        );
      })}
    </div>
  );
}
