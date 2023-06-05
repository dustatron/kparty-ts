import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";
import { SiAddthis } from "react-icons/si";

import React from "react";
import SimplePlayer from "../SimplePlayer";
import { ISong, IVideoData, useAuth } from "../../utils";

interface Props {
  previewData: ISong | IVideoData;
  isShowing: boolean;
  hideModal: () => void;
  addSong: (videoData: any, user) => void;
}

const VideoPreviewModal = ({
  previewData,
  isShowing,
  hideModal,
  addSong,
}: Props) => {
  // @ts-ignore
  const Id = previewData?.songId ? previewData?.songId : previewData?.id;
  const link = `https://www.youtube.com/watch?v=${Id}`;
  const { currentUser } = useAuth();
  const handleSave = () => {
    addSong(previewData, currentUser);
    hideModal();
  };
  return (
    <>
      <Modal size="xl" isOpen={isShowing} onClose={hideModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> {previewData?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimplePlayer link={link} />
          </ModalBody>
          <ModalFooter>
            <Spacer />
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Add <Icon ml="2" as={SiAddthis} />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoPreviewModal;
