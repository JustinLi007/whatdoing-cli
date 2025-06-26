import kmp from "./kmp";

export default function filterSearch(original: Content[], searchValue: string, caseSensivity: boolean): Content[] {
  const result: Content[] = [];
  const originalCopy = original.slice();

  if (searchValue === "") {
    return originalCopy;
  }

  let searchVal = searchValue;
  if (!caseSensivity) {
    searchVal = searchValue.toLowerCase();
  }

  for (const v of originalCopy) {
    let cur = v.title;
    if (!caseSensivity) {
      cur = v.title.toLowerCase();
    }

    const idx = kmp(cur, searchVal);
    if (idx >= 0) {
      result.push(v);
    }
  }

  return result;
}
