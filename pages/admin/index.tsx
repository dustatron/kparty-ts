import React, { useState, ChangeEvent } from "react"
import WithAuth from "../../components/WithAuth"
import {
  Container,
  Heading,
  Box,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react"
import { IRoom, useFirestoreAction } from "../../utils"

interface Props {
  roomsList?: IRoom[]
}

const index = ({ roomsList }: Props) => {
  const [selectedRoom, setSelectedRoom] = useState<IRoom>()
  // const { getAllRooms, roomsList } = useFirestoreAction()

  const selectRoom = (e: ChangeEvent<HTMLSelectElement>) => {
    const roomData = roomsList.find((room) => room.id === e.target.value)
    if (selectRoom) {
      setSelectedRoom(roomData)
    }
  }

  return (
    <Container maxW="container.xl">
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
          <Heading>Room Details</Heading>
          <Text>Title: {selectedRoom.title}</Text>
          <Text>Room ID: {selectedRoom.id}</Text>
          <Text>
            Current Song: {selectedRoom.currentSong} |{" "}
            {selectedRoom.playlist[selectedRoom.currentSong].songTitle}
          </Text>
          <Text>Status: {selectedRoom.isActive ? "Active" : "Empty"}</Text>
          <Text>Public: {selectedRoom.isPublic ? "true" : "false"}</Text>
          <Text>Song count: {selectedRoom.playlist.length}</Text>
        </Stack>
      )}
    </Container>
  )
}

export default WithAuth(index)
