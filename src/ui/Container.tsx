import Card from "./Card";
import filterSearch from "../utils/filter-search";
import filterSort from "../utils/filter-sort";
import kmp from "../utils/kmp";

interface Parameters {
  Items: Content[],
  SearchValue: string,
  SortValue: string,
}

export default function Container(params: Parameters) {
  const baseItems = params.Items.slice();

  let filteredItems = filterSearch<Content, string>(baseItems, params.SearchValue, (a, b) => {
    if (b.trim().toLowerCase() === "") {
      return true;
    }

    const res = kmp(a.title.trim().toLowerCase(), b.trim().toLowerCase()) >= 0;
    return res;
  });

  const asc: SortCompare<Content> = (a, b) => {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    }
    return 0;
  }
  const desc: SortCompare<Content> = (a, b) => {
    if (a.title > b.title) {
      return -1;
    } else if (a.title < b.title) {
      return 1;
    }
    return 0;
  }

  if (params.SortValue.trim().toLowerCase() === "asc") {
    filteredItems = filterSort(filteredItems, asc);
  } else if (params.SortValue.trim().toLowerCase() === "desc") {
    filteredItems = filterSort(filteredItems, desc);
  }

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
