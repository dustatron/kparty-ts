import React, { useEffect } from "react"
import Link from "next/link"
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Divider,
  Wrap,
} from "@chakra-ui/react"
import { Rooms, useFirestoreAction } from "../../utils"

interface Props {}

export const RoomList = (props: Props) => {
  const { getAllRooms, roomsList } = useFirestoreAction()

  useEffect(() => {
    getAllRooms()
    console.log("rooms", roomsList)
  }, [])

  return (
    <Box bg="#333" p="5" minH="30rem" width="100%">
      <Heading as="h3" color="white" textAlign="center" marginBottom="20px">
        Join the Party
      </Heading>
      {roomsList?.map((room) => (
        <Box
          bg="white"
          borderRadius="md"
          h="87px"
          p="3"
          marginBottom="1rem"
          key={room.id}
        >
          <Flex>
            <Box w="90%">
              <Heading as="h4" size="md">
                {room.title}
              </Heading>
              <Divider p="1" />
              <Wrap p="2">
                <Text fontSize="sm">{room.people} People</Text>
                <Text fontSize="sm">{room.playlist?.length} songs</Text>
              </Wrap>
            </Box>
            <Box p="3">
              <Link href={`/playlist/${room.id}`}>
                <a>
                  <Button colorScheme="blue">Join</Button>
                </a>
              </Link>
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  )
}
