import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react"

import React from "react"
import SimplePlayer from "../SimplePlayer"

interface previewData {
  link: string
  title: string
}

interface Props {
  previewData: previewData
  isShowing: boolean
  hideModal: () => void
}

const VideoPreviewModal = ({ previewData, isShowing, hideModal }: Props) => {
  const handleSave = () => {
    hideModal()
  }
  return (
    <>
      <Modal size="xl" isOpen={isShowing} onClose={hideModal}>
        <ModalContent>
          <ModalHeader> {previewData.title}</ModalHeader>
          <ModalBody>
            <SimplePlayer link={previewData.link} />
          </ModalBody>
          <ModalFooter>
            <Spacer />
            <Button colorScheme="blue" mr={3} onClick={hideModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default VideoPreviewModal
