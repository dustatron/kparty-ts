import React, { ReactElement } from "react"
import { useRouter } from "next/router"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"
import { useFirestoreAction, ISong, useRoomData } from "../../utils"

interface Props {
  isModalShowing: boolean
  hideModal: () => void
}

function SongEditModal({ isModalShowing, hideModal }: Props): ReactElement {
  const router = useRouter()
  const { roomId } = router.query

  const { removeSong } = useFirestoreAction()
  const { selected } = useRoomData()

  const handleDelete = () => {
    removeSong(selected, roomId)
    hideModal()
  }

  return (
    <>
      <Modal isOpen={isModalShowing} onClose={hideModal}>
        <ModalOverlay />
        {selected && (
          <ModalContent>
            <ModalHeader>Normal : {selected.songTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                duration:{" "}
                {(selected.duration / 60)
                  .toFixed(2)
                  .toString()
                  .replace(".", ":")}
              </div>
              <div>artist: {selected.artist}</div>
              <div>singer: {selected.singer}</div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={hideModal}>
                Close
              </Button>
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                delete
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}

export default SongEditModal
