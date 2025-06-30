import quickSort from "./qsort";

export default function filterSort<T>(src: T[], fn: SortCompare<T>) {
  const srcCopy = src.slice();
  quickSort(srcCopy, fn);
  return srcCopy;
}
