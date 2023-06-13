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
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";

import React, { useState } from "react";
import { HiOutlineCog } from "react-icons/hi";
import { ISong, secondsToHours, useFirestoreAction } from "../../utils";
import useRoomData from "../../utils/hooks/useRoomData";
import BasicModal from "./BasicModal";

type Props = { songData: ISong };

function EditSongButton({ songData }: Props) {
  const [isShowingConfirm, setIsShowingConfirm] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const [roomKey] = useRoomData((state) => [state.roomKey]);
  const { removeSong } = useFirestoreAction(roomKey);

  const handleDelete = () => {
    removeSong(songData);
    setIsShowing(false);
    setIsShowingConfirm(false);
  };

  const handleHideModal = () => {
    setIsShowing(false);
    setIsShowingConfirm(false);
  };

  const handleShowModal = () => {
    setIsShowing(true);
  };

  const { songTitle, artist, duration, link, singer } = songData;
  return (
    <>
      <Button variant="ghost" marginBottom="5px" onClick={handleShowModal}>
        <Icon as={HiOutlineCog} h={6} w={6} />
      </Button>
      <BasicModal isOpen={isShowing} onClose={() => setIsShowing(false)}>
        {songData && (
          <ModalContent>
            <ModalHeader> Song Details </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {!isShowingConfirm && (
                <Table size="sm" variant="striped" colorScheme="blue">
                  <Tbody>
                    <Tr>
                      <Td>Title</Td>
                      <Td>{songTitle}</Td>
                    </Tr>
                    <Tr>
                      <Td>artist:</Td>
                      <Td>{artist}</Td>
                    </Tr>
                    <Tr>
                      <Td>duration:</Td>
                      <Td>{secondsToHours(duration)}</Td>
                    </Tr>

                    <Tr>
                      <Td>Video Link:</Td>
                      <Td>
                        <Link href={link}>
                          <a target="_blank">
                            <CaLink color="blue.600"> YouTube link </CaLink>
                          </a>
                        </Link>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Singer:</Td>
                      <Td>{singer}</Td>
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
                    {songTitle}
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
      </BasicModal>
    </>
  );
}

export default EditSongButton;
