import Card from "./Card";
import filterSearch from "./utils/filter-search";
import filterSort from "./utils/filter-sort";

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
        key={value.Id}
        Title={value.Title}
        Episode={value.Episode}
        Description={value.Description}
        ImageSrc={value.ImageSrc}
        ContentLink={value.ContentLink}
      />
    );
  })

  return (
    <div className={`flex flex-col flex-nowrap gap-2 p-2`}>
      {elements}
    </div>
  );
}
