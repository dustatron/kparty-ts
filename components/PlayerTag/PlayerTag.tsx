import React from "react";
import QRCode from "react-qr-code";
import { Box, Container, Heading, Stack, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import useRoomData from "../../utils/hooks/useRoomData";

export const PlayerTag = () => {
  const host = window.location.hostname;
  const roomId = useRoomData((state) => state.roomKey);
  const link = `${host}/playlist/${roomId}`;
  return (
    <Container maxW="6xl" centerContent p="1">
      <Stack direction="row" spacing="10" alignContent="center">
        <Box>
          <QRCode value={`https://${host}/playlist/${roomId}`} size={100} />
        </Box>
        <Link href={`/playlist/${roomId}`}>
          <a>
            <Heading textAlign="center">Join Party @</Heading>
            <Button variant="outline">
              <Text>{link}</Text>
            </Button>
          </a>
        </Link>
        <Box>
          <QRCode value={`https://${host}/playlist/${roomId}`} size={100} />
        </Box>
      </Stack>
    </Container>
  );
};

export default PlayerTag;
