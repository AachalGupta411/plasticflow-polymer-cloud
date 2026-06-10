import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
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
      .get(`${API_BASE_URL}/api/dashboard`)
      .then((res) => setStats(normalizeStats(res.data)))
      .catch(() => {});
  }, []);

  return { stats };
}
