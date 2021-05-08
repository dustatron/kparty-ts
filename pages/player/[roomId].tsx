import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";
import { Rooms } from "../../utils";

const player = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;
  const [roomData, setRoomData] = useState(null);
  useEffect(() => {
    setRoomData(Rooms.find((room) => room.id === roomId));
    setTitle(`${roomData.title} Room`);
    return setRoomData(null);
  }, []);

  return <div>Player {roomId}</div>;
};

export default player;
