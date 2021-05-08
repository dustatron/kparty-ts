import { useEffect } from "react";
import { useRouter } from "next/router";

const playlist = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;
  useEffect(() => {
    setTitle(`${roomId} Room`);
  }, []);

  return <div>Playlist {roomId}</div>;
};

export default playlist;
