import React, { ReactElement } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface Props {
  isModalShowing: boolean;
  hideModal: () => void;
}

function SongEditModal({ isModalShowing, hideModal }: Props): ReactElement {
  return (
    <>
      <Modal isOpen={isModalShowing} onClose={hideModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Song Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Stuff here</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={hideModal}>
              Close
            </Button>
            <Button variant="ghost">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SongEditModal;
