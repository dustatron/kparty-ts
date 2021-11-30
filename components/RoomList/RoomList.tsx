import React, { useEffect } from "react"
import Link from "next/link"
import { Box, Heading, Button, Flex, Divider, Wrap } from "@chakra-ui/react"
import { ImPlay } from "react-icons/im"
import { IoMdAdd } from "react-icons/io"
import { useFirestoreAction } from "../../utils"

interface Props {}

export const RoomList = (props: Props) => {
  const { getAllRooms, roomsList } = useFirestoreAction()

  useEffect(() => {
    getAllRooms()
  }, [])

  const publicRoomList = roomsList?.filter((room) => room.isPublic)

  return (
    <Box bg="#333" p="5" minH="30rem" width="100%" borderRadius="sm">
      <Heading as="h3" color="white" textAlign="center" marginBottom="20px">
        Party List
      </Heading>
      {publicRoomList?.map((room) => (
        <Box
          bg="white"
          borderRadius="sm"
          minHeight="87px"
          p="2"
          marginBottom="1rem"
          key={room.id}
        >
          <Flex>
            <Box w="68%">
              <Heading as="h4" size="md">
                {room.title}
              </Heading>
              <Divider p="1" />
              <Wrap paddingTop="2">
                <Link href={`/player/${room.id}`}>
                  <a>
                    <Button
                      rightIcon={<ImPlay />}
                      size="sm"
                      variant="outline"
                      colorScheme="orange"
                    >
                      Player
                    </Button>
                  </a>
                </Link>

                <Button
                  size="sm"
                  variant="solid"
                  colorScheme={room.isActive ? "red" : "teal"}
                >
                  {room.isActive ? "Active" : "Empty"}
                </Button>
              </Wrap>
            </Box>
            <Box p="3" width="20%">
              <Link href={`/playlist/${room.id}`}>
                <a>
                  <Button
                    leftIcon={<IoMdAdd />}
                    colorScheme="blue"
                    variant="outline"
                  >
                    Sing
                  </Button>
                </a>
              </Link>
              <Button size="sm" variant="ghost">
                Songs: {room.playlist ? room.playlist?.length : 0}
              </Button>
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  )
}
