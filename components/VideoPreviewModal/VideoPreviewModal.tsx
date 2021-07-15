import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Button,
} from "@chakra-ui/react"
import SimplePlayer from "../SimplePlayer"

interface previewData {
  link: string
  title: string
  handleAdd: () => void
}

interface Props {
  previewData: previewData
  isShowing: boolean
  hideModal: () => void
}

const VideoPreviewModal = ({ previewData, isShowing, hideModal }: Props) => {
  const handleSave = () => {
    previewData.handleAdd()
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
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Add
            </Button>
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
