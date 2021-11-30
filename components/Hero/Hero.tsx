import Link from "next/link"
import { useEffect } from "react"
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  SimpleGrid,
} from "@chakra-ui/react"
import { IAuth, IRoom, useFirestoreAction } from "../../utils"
import { useAuth } from "../../utils"
import { RoomList } from "../RoomList"

interface props {
  setTitle: (title: string) => void
  roomsList: IRoom[]
}

export default function CallToActionWithAnnotation({
  setTitle,
  roomsList,
}: props) {
  useEffect(() => {
    setTitle("Living room karaoke parties just got easier")
  }, [])

  const { currentUser }: IAuth = useAuth()

  return (
    <Container maxW="4xl" padding="0">
      <SimpleGrid columns={[1, null, 2]} spacing={6} p={["1", null, "10"]}>
        <RoomList roomsList={roomsList} />
        <Box height="80px">
          <Heading as="h2" size="2xl" marginBottom="2rem">
            Karaoke Party
          </Heading>
          <Text marginBottom="2rem">
            Click on the <strong>+ Sing</strong> button to join a party and add
            songs to the karaoke playlist.
          </Text>
          <Text marginBottom="2rem">
            Click on the <strong>Player</strong> button to see and play the
            karaoke videos for that party.
          </Text>
          <Text marginBottom="2rem">
            Feel free to pick any <strong>Party</strong> is not active.
          </Text>
          <Box textAlign="right">
            {!currentUser && (
              <Link href="/signIn">
                <a>
                  <Button colorScheme="blue">Sign In</Button>
                </a>
              </Link>
            )}
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  )
}
