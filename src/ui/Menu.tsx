import Option from "./Option";

interface Paramaters {
  MenuItems: MenuItem[],
  MenuHidden: boolean,
  OnClick: () => void,
}

export default function Menu(params: Paramaters) {
  return (
    <div
      className={`grid grid-cols-2 landscape:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 p-2 
${params.MenuHidden ? "hidden" : ""}`
      }
    >
      {params.MenuItems.map((value) => {
        return (
          <Option
            key={value.id}
            Name={value.name}
            Path={value.path}
            OnClick={params.OnClick}
          />
        );
      })}
    </div>
  );
}
