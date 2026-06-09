import { useEffect, useState } from "react";
import axios from "axios";
import { DEFAULT_STATS } from "./constants";

function normalizeStats(data) {
  if (!data) return DEFAULT_STATS;

  return {
    plants: data.plants ?? DEFAULT_STATS.plants,
    production: data.production ?? DEFAULT_STATS.production,
    yield: data.yield ?? DEFAULT_STATS.yield,
    uptime: data.uptime ?? DEFAULT_STATS.uptime,
  };
}

export default function useLandingData() {
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/dashboard")
      .then((res) => setStats(normalizeStats(res.data)))
      .catch(() => {});
  }, []);

  return { stats };
}
