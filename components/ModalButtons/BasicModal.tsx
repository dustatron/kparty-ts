import { Modal, ModalOverlay } from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function BasicModal({ isOpen, onClose, children }: Props) {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {children}
    </Modal>
  );
}

export default BasicModal;
