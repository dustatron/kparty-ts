import { Button, Modal, ModalOverlay, Icon } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import React, { useState } from "react";
import { IVideoData } from "../../utils";
import PreviewBody from "./PreviewBody";
import BasicModal from "./BasicModal";

type Props = { video: IVideoData; handleAdd: () => void };

const PreviewButton = ({ video, handleAdd }: Props) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setIsShowing(true)}>
        <Icon as={FaPlay} marginRight="5px" />
      </Button>
      <BasicModal isOpen={isShowing} onClose={() => setIsShowing(false)}>
        <PreviewBody title={video.title} videoId={video.id} add={handleAdd} />
      </BasicModal>
    </>
  );
};

export default PreviewButton;
