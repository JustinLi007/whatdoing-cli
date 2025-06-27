import { useEffect } from "react";
import { refreshInterval } from "../utils/timer";

export default function Refresher() {

  function timeSince(t: number) {
    const now = new Date();
    const diff = now.getTime() - t;
    return diff;
  }

  function refresh() {
    console.log("[REFRESH]");
    const now = new Date();
    localStorage.setItem("whatdoing-next-refresh", now.toString());
  }

  function tick() {
    // TODO: if no time set, refresh then set. should be set on login or signup.

    const nextRefresh = localStorage.getItem("whatdoing-next-refresh");
    if (!nextRefresh) {
      refresh();
    } else {
      const nextRefreshTime = new Date(nextRefresh);
      const diff = timeSince(nextRefreshTime.getTime());
      const t = refreshInterval({
        seconds: 10,
        minutes: 1,
        hours: 1,
      });

      if (diff >= t) {
        refresh();
      }
    }
  }

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(ticker);
    }
  });

  return (
    <></>
  );
}
