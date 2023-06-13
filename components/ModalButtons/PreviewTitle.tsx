import { Box, Heading, Modal, ModalOverlay, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IVideoData } from "../../utils";
import getDuration from "../../utils/getDuration";
import BasicModal from "./BasicModal";
import PreviewBody from "./PreviewBody";

type Props = { video: IVideoData; handleAdd: () => void };

const PreviewTitle = ({ video, handleAdd }: Props) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <Box w="60%" onClick={() => setIsShowing(true)} cursor="pointer">
        <Heading w="100%" textAlign="left" size="sm">
          {video.title}
        </Heading>
        <Text fontSize="xs"> artist: {video.artist} </Text>
        <Text fontSize="xs">
          duration: {getDuration(String(video.duration))}
        </Text>
      </Box>
      <BasicModal isOpen={isShowing} onClose={() => setIsShowing(false)}>
        <PreviewBody title={video.title} videoId={video.id} add={handleAdd} />
      </BasicModal>
    </>
  );
};

export default PreviewTitle;
