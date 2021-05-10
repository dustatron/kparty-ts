export const fetchYTSongs = async (setIsShowingSpinner, songTitle) => {
  setIsShowingSpinner(true);
  const data = await fetch(`/api/yt?song=${songTitle}`);
  const jsonData = await data.json();
  setIsShowingSpinner(false);
  return jsonData.videos;
};
