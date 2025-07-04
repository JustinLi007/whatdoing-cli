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
            Title={value.anime_name.name}
            Episode={value.episodes.toString()}
            Description={value.description}
            ImageSrc={value.image_url}
            ContentLink={""}
          />
        );
      case "manga":
        return (
          <Card
            key={value.id}
            Title={"manga not implemented"}
            Episode={value.chapters.toString()}
            Description={""}
            ImageSrc={""}
            ContentLink={""}
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
