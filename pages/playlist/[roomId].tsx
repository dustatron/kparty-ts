import React, { FC, useEffect, useState } from "react";

import PlaylistWrapper from "../../components/PlaylistWrapper";
import WithAuth from "../../components/WithAuth";
import { useRouter } from "next/router";
import useRoomData from "../../utils/hooks/useRoomData";

interface Props {
  setTitle: (title: string) => void;
}

const playlist: FC<Props> = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;
  const [setRoomKey, clearRoomData] = useRoomData((state) => [
    state.setRoomKey,
    state.clearRoomData,
  ]);
  useEffect(() => {
    setRoomKey(roomId);

    return () => {
      clearRoomData();
    };
  }, [roomId]);
  return <PlaylistWrapper setTitle={setTitle} />;
};

export default WithAuth(playlist);
