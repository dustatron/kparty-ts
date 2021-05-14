import { useState } from "react";
import { IUseFetchYT } from "./";

export const useFetchYT = (): IUseFetchYT => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const runSearch = (songTitle: string) => {
    setIsLoading(true);
    try {
      const data = fetch(`/api/yt?song=${songTitle}`)
        .then((data) => data.json())
        .then((json) => setResults(json.videos))
        .then(() => setIsLoading(false));
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { isLoading, results, error, runSearch };
};
