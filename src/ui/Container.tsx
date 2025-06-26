import Card from "./Card";
import filterSearch from "../utils/filter-search";
import filterSort from "../utils/filter-sort";

interface Parameters {
  Items: Content[],
  SearchValue: string,
  SortValue: string,
}

export default function Container(params: Parameters) {
  const baseItems = params.Items.slice();
  let filteredItems = filterSearch(baseItems, params.SearchValue, false);
  filteredItems = filterSort(filteredItems, params.SortValue);

  const elements = filteredItems.map((value) => {
    return (
      <Card
        key={value.id}
        Title={value.title}
        Episode={value.episode}
        Description={value.description}
        ImageSrc={value.imageSrc}
        ContentLink={value.contentLink}
      />
    );
  })

  return (
    <div className={`flex flex-col flex-nowrap gap-2 p-2`}>
      {elements}
    </div>
  );
}
