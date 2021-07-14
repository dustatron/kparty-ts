import Link from "next/link"
import { useEffect } from "react"
import { LinkBox, KrystalCopy } from "./"
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  createIcon,
  Icon,
  Flex,
  Divider,
  SimpleGrid,
  Wrap,
} from "@chakra-ui/react"
import { IAuth, Rooms } from "../../utils"
import { useAuth } from "../../utils"
import { RoomList } from "../RoomList"

interface Props {
  setTitle: (string) => void
}

const KrystalWrapper = ({ setTitle }: Props) => {
  useEffect(() => {
    setTitle("Collaborative Karaoke Party")
  }, [])

  const { currentUser }: IAuth = useAuth()

  return (
    <>
      <Container maxW={"4xl"}>
        <SimpleGrid columns={[1, null, 2]} spacing={6} p="10">
          <Box bg="#333" height="80px" p="5" minH="30rem" width="100%">
            <Heading
              as="h3"
              color="white"
              textAlign="center"
              marginBottom="20px"
            >
              Krystal's Party
            </Heading>
            <LinkBox
              title="Playlist"
              subTitle="Add music to the list"
              img="playlist"
              btnLink="/playlist/krystal"
            />
            <LinkBox
              title="Video Player"
              subTitle="Play the videos"
              img="Player"
              btnLink="/player/krystal"
            />
          </Box>
          <Box height="80px">
            <Heading as="h2" size="2xl" marginBottom="2rem">
              Where Karaoke Happens
            </Heading>
            <Text marginBottom="2rem">
              <KrystalCopy />
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
    </>
  )
}

export default KrystalWrapper
