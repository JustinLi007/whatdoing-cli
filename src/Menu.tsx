import Header from "./Header";
import Option from "./Option";

interface Paramaters {
  MenuItems: MenuItem[],
}

export default function Menu(params: Paramaters) {
  const options = params.MenuItems.map((value) => {
    return (
      <Option
        key={value.Id}
        Name={value.Name}
        Path={value.Path}
      />
    );
  });

  return (
    <header>
      <Header Name="Whatdoing" Path="/" />
      <div
        className={`grid grid-cols-2 landscape:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 p-2`}
      >
        {options}
      </div>
    </header>
  );
}
