export default function filterSearch<T, U>(src: T[], filterValue: U, fn: CompareFn<T, U>) {
  const result: T[] = [];
  const srcCopy = src.slice();

  for (const v of srcCopy) {
    const res = fn(v, filterValue)
    if (res) {
      result.push(v);
    }
  }

  return result;
}
