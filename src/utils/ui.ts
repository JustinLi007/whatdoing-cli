export function newDocClickHandler(elementId: string, cb: (value: boolean) => void) {
  return function(event: MouseEvent) {
    const container = document.getElementById(elementId);
    if (!container) {
      return;
    }

    const t = event.target;
    if (!(t instanceof Element)) {
      return;
    }
    if (!container.contains(t)) {
      cb(true);
      return;
    }
  }
}

export function toSuggestionItem(value: ContentTypes): SuggestionItem | null {
  switch (value.kind) {
    case "anime":
      return {
        key: value.id,
        kind: "anime",
        title: value.anime_name.name,
        description: value.description,
      }
    case "manga":
      return {
        key: value.id,
        kind: "anime",
        title: "manga not implemented",
      }
    default:
      return null;
  }
}
