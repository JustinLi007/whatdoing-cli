type DebounceCallback = () => void;
export default function debounce(delay: number) {
  let timer: number;
  return (cb: DebounceCallback) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
    }, delay);
  }
}
