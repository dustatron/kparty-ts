import { useState } from "react";
import { useQuery } from "react-query";
import { IVideoData } from "./index";

export const useFetchYT = (songTitle) => {



  const fetcher = async () => {
    const result = await fetch(`/api/yt?song=${songTitle}`)
    const data = await result.json()
    return data
  }
  return useQuery<IVideoData[]>(['songSearch', songTitle], fetcher, { enabled: false })
  // return { isLoading, results, error, runSearch, clearResults };
};
