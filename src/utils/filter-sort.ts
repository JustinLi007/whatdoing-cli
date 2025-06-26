export default function filterSort(original: Content[], sortValue: string): Content[] {
  let result: Content[];
  const originalCopy = original.slice();

  const val = sortValue.toLowerCase();
  switch (val) {
    case "asc":
      result = sort(originalCopy, sortAsc);
      break;
    case "desc":
      result = sort(originalCopy, sortDesc);
      break;
    default:
      result = originalCopy;
  }

  return result;
}

function sort(original: Content[], fn: (original: Content[]) => Content[]): Content[] {
  const result = fn(original);
  return result;
}

function sortAsc(original: Content[]): Content[] {
  const result = original.slice().sort((a, b) => {
    const aVal = a.title;
    const bVal = b.title;
    if (aVal > bVal) {
      return 1;
    } else if (aVal < bVal) {
      return -1;
    }
    return 0;
  });

  return result;
}

function sortDesc(original: Content[]): Content[] {
  const result = original.slice().sort((b, a) => {
    const aVal = a.title;
    const bVal = b.title;
    if (aVal > bVal) {
      return 1;
    } else if (aVal < bVal) {
      return -1;
    }
    return 0;
  });

  return result;
}
