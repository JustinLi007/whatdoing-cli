import { useEffect } from "react";
import { refreshInterval } from "../utils/timer";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { FetchRefresh } from "../api/users";

export default function Refresher() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: FetchRefresh,
    onSuccess() { },
    onError() {
      navigate({
        to: "/login",
      });
    },
  });

  function refresh() {
    mutation.mutate();
    localStorage.setItem("whatdoing-next-refresh", Date().toString());
  }

  function tick() {
    const nextRefresh = localStorage.getItem("whatdoing-next-refresh");
    if (!nextRefresh) {
      refresh();
    } else {
      const diff = new Date().getTime() - new Date(nextRefresh).getTime();
      const t_ms = refreshInterval({ hours: 1 });
      if (diff >= t_ms) {
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
