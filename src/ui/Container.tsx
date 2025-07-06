import Card from "./Card";
import filterSearch from "../utils/filter-search";
import filterSort from "../utils/filter-sort";
import kmp from "../utils/kmp";

interface Parameters {
  Items: ContentTypes[],
  SearchValue: string,
  SortValue: string,
}

export default function Container(params: Parameters) {
  const baseItems = params.Items.slice();

  let filteredItems = filterSearch<ContentTypes, string>(baseItems, params.SearchValue, (a, b) => {
    if (b.trim().toLowerCase() === "") {
      return true;
    }

    if (a.kind === "anime") {
      const res = kmp(a.anime_name.name.trim().toLowerCase(), b.trim().toLowerCase()) >= 0;
      return res;
    }
    return false;
  });

  const asc: SortCompare<ContentTypes> = (a, b) => {
    let left = "";
    let right = "";
    if (a.kind === "anime") {
      left = a.anime_name.name;
    }
    if (b.kind === "anime") {
      right = b.anime_name.name;
    }
    if (left < right) {
      return -1;
    } else if (left > right) {
      return 1;
    }
    return 0;
  }
  const desc: SortCompare<ContentTypes> = (a, b) => {
    let left = "";
    let right = "";
    if (a.kind === "anime") {
      left = a.anime_name.name;
    }
    if (b.kind === "anime") {
      right = b.anime_name.name;
    }
    if (left > right) {
      return -1;
    } else if (left < right) {
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
    switch (value.kind) {
      case "anime":
        return (
          <Card
            key={value.id}
            title={value.anime_name.name}
            episode={value.episodes ? value.episodes.toString() : ""}
            description={value.description ? value.description : ""}
            imageSrc={value.image_url ? value.image_url : ""}
            contentLink={""}
          />
        );
      case "manga":
        return (
          <Card
            key={value.id}
            title={"manga not implemented"}
            episode={value.chapters.toString()}
            description={""}
            imageSrc={""}
            contentLink={""}
          />
        );
    }
  })


  return (
    <div className={`flex flex-col flex-nowrap gap-2 p-2`}>
      {elements}
    </div>
  );
}
