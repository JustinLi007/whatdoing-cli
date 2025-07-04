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
