import {
  Box,
  Button,
  Container,
  Heading,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react"
import { IRoom, useFirestoreAction } from "../../utils"
import React, { ChangeEvent, useState } from "react"

import PlaylistWrapper from "../../components/PlaylistWrapper"
import WithAuth from "../../components/WithAuth"

interface Props {
  roomsList?: IRoom[]
  setTitle: (title: string) => void
}

const index = ({ roomsList, setTitle }: Props) => {
  const [selectedRoom, setSelectedRoom] = useState<IRoom>()
  const [isShowingRoomDetails, setIsShowingRoomDetails] = useState(false)
  // const { getAllRooms, roomsList } = useFirestoreAction()

  const selectRoom = (e: ChangeEvent<HTMLSelectElement>) => {
    const roomData = roomsList.find((room) => room.id === e.target.value)
    if (selectRoom) {
      setSelectedRoom(roomData)
    }
  }

  return (
    <Container maxW="container.xl" centerContent p="5">
      <Heading>KJ Dashboard</Heading>
      <Box>
        {!roomsList && <Skeleton height="40px" />}
        {roomsList && (
          <Select placeholder="Select option" onChange={selectRoom}>
            {roomsList?.map((room) => (
              <option value={room.id}>{room.title}</option>
            ))}
          </Select>
        )}
      </Box>
      {selectedRoom && (
        <Stack spacing="3">
          <Heading>
            Room Details{" "}
            <Button
              onClick={() => {
                setIsShowingRoomDetails(!isShowingRoomDetails)
              }}
            >
              {isShowingRoomDetails ? "Hide Details" : "Show Details"}
            </Button>
          </Heading>
          {isShowingRoomDetails && (
            <Box>
              <Text>Title: {selectedRoom.title}</Text>
              <Text>Room ID: {selectedRoom.id}</Text>
              <Text>
                Current Song: {selectedRoom.currentSong} |{" "}
                {selectedRoom.playlist[selectedRoom.currentSong].songTitle}
              </Text>
              <Text>Status: {selectedRoom.isActive ? "Active" : "Empty"}</Text>
              <Text>Public: {selectedRoom.isPublic ? "true" : "false"}</Text>
              <Text>Song count: {selectedRoom.playlist.length}</Text>
            </Box>
          )}
          <PlaylistWrapper setTitle={setTitle} roomId={selectedRoom.id} isKJ />
        </Stack>
      )}
    </Container>
  )
}

export default WithAuth(index)
