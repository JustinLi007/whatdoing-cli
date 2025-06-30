export default function quickSort<T>(src: T[], fn: SortCompare<T>) {
  qSort(src, 0, src.length - 1, fn);
}

function qSort<T>(src: T[], start: number, end: number, fn: SortCompare<T>) {
  if (end <= start) {
    return;
  }

  const part = partition(src, start, end, fn);
  qSort(src, start, part - 1, fn);
  qSort(src, part + 1, end, fn);
}

function partition<T>(src: T[], start: number, end: number, fn: SortCompare<T>): number {
  const pivot = src[end];

  let j = start - 1;
  for (let i = start; i < end; i++) {
    if (fn(src[i], pivot) <= 0) {
      j++;
      swap(src, i, j);
    }
  }
  j++;
  swap(src, j, end);

  return j;
}

function swap<T>(src: T[], i: number, j: number) {
  const temp = src[i];
  src[i] = src[j];
  src[j] = temp;
}
