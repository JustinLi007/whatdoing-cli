export function refreshInterval(params: {
  seconds?: number;
  minutes?: number;
  hours?: number;
}) {
  let milliseconds = 0;

  if (params.seconds) {
    milliseconds += params.seconds * 1000;
  }
  if (params.minutes) {
    milliseconds += params.minutes * 1000 * 60;
  }
  if (params.hours) {
    milliseconds += params.hours * 1000 * 60 * 60;
  }

  return milliseconds;
}
