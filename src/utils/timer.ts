export function refreshInterval(params: {
  seconds?: number;
  minutes?: number;
  hours?: number;
}) {
  const opts = {
    seconds: 1,
    minutes: 1,
    hours: 1,
  }

  if (params.seconds) {
    opts.seconds = Math.max(1, params.seconds);
  }
  if (params.minutes) {
    opts.minutes = Math.max(1, params.minutes);
  }
  if (params.hours) {
    opts.hours = Math.max(1, params.hours);
  }

  const interval = 1000 * opts.seconds * opts.minutes * opts.hours;
  return interval;
}
