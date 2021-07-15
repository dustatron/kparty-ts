import React from "react"
import {
  Box,
  Wrap,
  Heading,
  Button,
  Icon,
  Image,
  Text,
  VStack,
  Spacer,
} from "@chakra-ui/react"
import { IVideoData, videoToSong, useFirestoreAction, IUser } from "../../utils"
import { SiAddthis } from "react-icons/si"
import { FaHeart, FaPlay } from "react-icons/fa"

interface Props {
  videoData: IVideoData
  authorId: string
  user: IUser
  roomId: string | string[]
  changeTab: (index: number) => void
  clear: () => void
  handleShowPreview: (link, title, handleAdd) => void
}

const SongSearchResultBox = ({
  videoData,
  roomId,
  user,
  changeTab,
  clear,
  handleShowPreview,
}: Props) => {
  const { title, artist, duration, id, publishedAt } = videoData
  const { addSong } = useFirestoreAction()

  const thumbnail = `https://i.ytimg.com/vi/${id}/default.jpg`
  const link = `https://www.youtube.com/watch?v=${id}`

  const handleAdd = () => {
    const songNormalized = videoToSong(videoData, user)
    addSong(songNormalized, roomId)
    changeTab(0)
    clear()
  }

  const getDuration = (seconds) => {
    const toMinutes = seconds / 60
    const time = toMinutes.toFixed(2)
    return time.toString().replace(".", ":")
  }

  const getDate = (date) => {
    const dateObj = new Date(date)
    const month = dateObj.getMonth()
    const year = dateObj.getFullYear()
    return `${month} / ${year}`
  }

  return (
    <Box
      p="1"
      margin="5px auto"
      border="1px"
      borderRadius="lg"
      justifyContent="center"
    >
      <Wrap p="2">
        <Box w="20%">
          <Image src={thumbnail} alt="thumbnail" borderRadius="lg" h="5rem" />
        </Box>

        <Box w="60%">
          <Heading w="100%" textAlign="left" size="sm">
            {title}
          </Heading>
          <Text fontSize="xs"> artist: {artist} </Text>
          <Text fontSize="xs"> created on : {getDate(publishedAt)} </Text>
          <Text fontSize="xs"> duration: {getDuration(duration)} </Text>
        </Box>

        <VStack w="10%">
          <a /*href={link} target="_blank"*/>
            <Button
              variant="outline"
              onClick={() => handleShowPreview(link, title, handleAdd)}
            >
              <Icon as={FaPlay} marginRight="5px" />
            </Button>
          </a>

          <Button onClick={handleAdd}>
            <Icon as={SiAddthis} />
          </Button>

          {/* <Button variant="ghost">
          <Icon as={FaHeart} />
        </Button> */}
        </VStack>
      </Wrap>
    </Box>
  )
}

export default SongSearchResultBox
