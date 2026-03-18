import { useEffect, useState } from "react";
import useDebounce from "./useDebounce ";

export type NominatimResult = {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
};

const useNominatim = (query: string) => {
  const [result, setResult] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResult([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(debouncedQuery)}&format=json&limit=5`,
        );
        if (!response.ok) {
          setResult([]);
          return;
        }
        const data: NominatimResult[] = await response.json();
        setResult(data);
      } catch {
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return { result, loading };
};

export default useNominatim;
