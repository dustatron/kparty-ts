import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import React, { ReactElement } from "react"
import { useAuth, useFirestoreAction, useRoomData } from "../../utils"

interface Props {
  isFavModalShowing: boolean
  hideFavModal: () => void
}

function FavSongModal({
  isFavModalShowing,
  hideFavModal,
}: Props): ReactElement {
  const { removeFavorite } = useFirestoreAction()
  const { currentUser } = useAuth()
  const { selected } = useRoomData()

  const handleDelete = () => {
    removeFavorite(selected, currentUser)
    hideFavModal()
  }

  return (
    <>
      <Modal isOpen={isFavModalShowing} onClose={hideFavModal}>
        <ModalOverlay />
        {selected && (
          <ModalContent>
            <ModalHeader>Favorite : {selected.songTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>duration: {selected.duration}</div>
              <div>artist: {selected.artist}</div>
              <div>singer: {selected.singer}</div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={hideFavModal}>
                Close
              </Button>
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                delete
              </Button>
              <Button variant="ghost">Save</Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}

export default FavSongModal
