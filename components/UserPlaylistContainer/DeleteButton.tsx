import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type Props = { deletePlaylist: () => void };

function DeleteButton({ deletePlaylist }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        size="lg"
        w="90%"
        variant="outline"
        colorScheme="red"
      >
        Delete All Songs
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Delete all songs in this playlist?</ModalBody>
          <ModalFooter>
            <Stack direction="row" justifyContent="space-between" w="100%">
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  deletePlaylist();
                }}
              >
                Confirm
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteButton;
