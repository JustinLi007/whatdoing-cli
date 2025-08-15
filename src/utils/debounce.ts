type DebounceCallback = () => void;
export default function debounce(delay: number) {
  let timer: number;
  return {
    debouncedFn:
      (cb: DebounceCallback) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          cb();
        }, delay);
      },
    cancelFn: () => {
      clearTimeout(timer);
    }
  }
}
