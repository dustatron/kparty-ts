import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  createIcon,
  Flex,
  Divider,
  SimpleGrid,
  Wrap,
} from "@chakra-ui/react"
const KrystalCopy = () => {
  return (
    <>
      <Box>
        <Heading as="h3" size="md">
          Playlist
        </Heading>
        <Text>
          Collaborate in real-time on a karaoke <strong> playlist </strong>with
          friends. From the playlist, you can search and add new songs. You can
          also review the songs in the playlist, reorder the songs, and delete
          songs you don’t want to sing anymore.
        </Text>
      </Box>
      <Box marginTop="6">
        <Heading as="h3" size="md">
          Video Player
        </Heading>
        <Text>
          The video player is for playing the karaoke videos in your playlist on
          a TV or other larger screen for you to sing from.
        </Text>
      </Box>
    </>
  )
}

export default KrystalCopy
