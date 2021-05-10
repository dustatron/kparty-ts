import React from "react";
import {
  Box,
  Wrap,
  Heading,
  Button,
  Icon,
  Image,
  Text,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { IVideoData } from "../../utils";
import { SiAddthis } from "react-icons/si";
import { FaHeart, FaPlay } from "react-icons/fa";
interface Props {
  videoData: IVideoData;
}

const SongSearchResultBox = ({ videoData }: Props) => {
  const {
    title,
    artist,
    duration,
    id,
    original_title,
    publishedAt,
  } = videoData;

  const getDuration = (seconds) => {
    const toMinutes = seconds / 60;
    const time = toMinutes.toFixed(2);
    return time.toString().replace(".", ":");
  };

  const getDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${month} / ${year}`;
  };

  return (
    <Box
      p="5"
      margin="5px auto"
      border="1px"
      borderRadius="lg"
      justifyContent="center"
    >
      <Heading w="100%" textAlign="center" size="sm">
        {title}
      </Heading>
      <Wrap p="3">
        <Box w="30%">
          <Image
            src={`https://i.ytimg.com/vi/${id}/default.jpg`}
            alt="thumbnail"
            borderRadius="lg"
          />
        </Box>
        <Box w="65%">
          <Text fontSize="xs"> artist: {artist} </Text>
          <Text fontSize="xs"> created on : {getDate(publishedAt)} </Text>
          <Text fontSize="xs"> duration: {getDuration(duration)} </Text>
        </Box>
      </Wrap>
      <HStack>
        <Button>
          <Icon as={SiAddthis} />
        </Button>
        <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank">
          <Button variant="outline">
            <Icon as={FaPlay} marginRight="5px" /> Preview
          </Button>
        </a>
        <Spacer />
        <Button variant="ghost">
          <Icon as={FaHeart} />
        </Button>
      </HStack>
    </Box>
  );
};

export default SongSearchResultBox;
