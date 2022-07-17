import {
  Box,
  Button,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import { FaHeart, FaPlay } from "react-icons/fa"
import { IUser, IVideoData, useFirestoreAction, videoToSong } from "../../utils"

import React from "react"
import { SiAddthis } from "react-icons/si"
import { useState } from "react"

interface Props {
  videoData: IVideoData
  authorId: string
  user: IUser
  roomId: string
  changeTab: (index: number) => void
  clear: () => void
  handleShowPreview: (link, title, handleAdd) => void
  isKJ: boolean
}

const SongSearchResultBox = ({
  videoData,
  roomId,
  user,
  changeTab,
  clear,
  handleShowPreview,
  isKJ,
}: Props) => {
  const [isShowingUserInput, setIsShowingCustomUser] = useState(false)
  const [customUserName, setCustomUserName] = useState("")
  const { title, artist, duration, id, publishedAt } = videoData
  const { addSong } = useFirestoreAction(roomId)
  const thumbnail = `https://i.ytimg.com/vi/${id}/default.jpg`
  const link = `https://www.youtube.com/watch?v=${id}`

  const handleAdd = () => {
    if (isKJ) {
      setIsShowingCustomUser(true)
    } else {
      const songNormalized = videoToSong(videoData, user)
      addSong(songNormalized)
      changeTab(0)
      clear()
    }
  }

  const handleAddCustomUserName = () => {
    const customUser: IUser = {
      displayName: customUserName,
      email: "",
      photoURL: "",
      uid: "custom-user",
    }
    const songNormalized = videoToSong(videoData, customUser)
    addSong(songNormalized)
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
        {isShowingUserInput && (
          <Box w="60%">
            <Heading w="100%" textAlign="left" size="sm">
              Add User Name
            </Heading>
            <Input
              placeholder="User Name"
              value={customUserName}
              onChange={(e) => setCustomUserName(e.target.value)}
            />
          </Box>
        )}
        {!isShowingUserInput && (
          <Box w="60%">
            <Heading w="100%" textAlign="left" size="sm">
              {title}
            </Heading>
            <Text fontSize="xs"> artist: {artist} </Text>
            <Text fontSize="xs"> created on : {getDate(publishedAt)} </Text>
            <Text fontSize="xs"> duration: {getDuration(duration)} </Text>
          </Box>
        )}

        <VStack w="10%">
          <a /*href={link} target="_blank"*/>
            <Button
              variant="outline"
              onClick={() => handleShowPreview(link, title, handleAdd)}
            >
              <Icon as={FaPlay} marginRight="5px" />
            </Button>
          </a>
          {!isShowingUserInput && (
            <Button onClick={handleAdd}>
              <Icon as={SiAddthis} />
            </Button>
          )}
          {isShowingUserInput && (
            <Button
              colorScheme="green"
              onClick={handleAddCustomUserName}
              isDisabled={customUserName.length < 1}
            >
              Add
            </Button>
          )}

          {/* <Button variant="ghost">
          <Icon as={FaHeart} />
        </Button> */}
        </VStack>
      </Wrap>
    </Box>
  )
}

export default SongSearchResultBox
