import {
  Box,
  Button,
  Link as CaLink,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Table,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { useFirestoreAction } from "../../utils";

import Link from "next/link";
import { secondsToHours } from "../../utils";
import useRoomData from "../../utils/hooks/useRoomData";

interface Props {
  isModalShowing: boolean;
  hideModal: () => void;
  roomId: string | string[];
}

function SongEditModal({
  isModalShowing,
  hideModal,
  roomId,
}: Props): ReactElement {
  const [isShowingConfirm, setIsShowingConfirm] = useState(false);

  const { removeSong } = useFirestoreAction(roomId as string);
  const selected = useRoomData((state) => state?.selected);

  const handleDelete = () => {
    removeSong(selected);
    hideModal();
    setIsShowingConfirm(false);
  };

  const handleHideModal = () => {
    hideModal();
    setIsShowingConfirm(false);
  };

  return (
    <>
      <Modal isOpen={isModalShowing} onClose={handleHideModal}>
        <ModalOverlay />
        {selected && (
          <ModalContent>
            <ModalHeader> Song Details </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {!isShowingConfirm && (
                <Table size="sm" variant="striped" colorScheme="blue">
                  <Tbody>
                    <Tr>
                      <Td>Title</Td>
                      <Td>{selected.songTitle}</Td>
                    </Tr>
                    <Tr>
                      <Td>artist:</Td>
                      <Td>{selected.artist}</Td>
                    </Tr>
                    <Tr>
                      <Td>duration:</Td>
                      <Td>{secondsToHours(selected.duration)}</Td>
                    </Tr>

                    <Tr>
                      <Td>Video Link:</Td>
                      <Td>
                        <Link href={selected.link}>
                          <a target="_blank">
                            <CaLink color="blue.600"> YouTube link </CaLink>
                          </a>
                        </Link>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Singer:</Td>
                      <Td>{selected.singer}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              )}
              {isShowingConfirm && (
                <Box>
                  <Heading as="h3" size="lg">
                    Deleting...
                  </Heading>
                  <Heading as="h3" size="md">
                    {selected.songTitle}
                  </Heading>
                </Box>
              )}
            </ModalBody>

            <ModalFooter>
              {!isShowingConfirm && (
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => setIsShowingConfirm(true)}
                >
                  Delete
                </Button>
              )}
              {isShowingConfirm && (
                <Button colorScheme="red" mr={3} onClick={handleDelete}>
                  Confirm
                </Button>
              )}
              <Spacer />
              <Button colorScheme="blue" mr={3} onClick={handleHideModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}

export default SongEditModal;
