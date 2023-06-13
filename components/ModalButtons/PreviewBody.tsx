import {
  Button,
  Icon,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import SimplePlayer from "../SimplePlayer";
import { SiAddthis } from "react-icons/si";

type Props = { title: string; videoId: string; add: () => void };

const PreviewBody = ({ title, videoId, add }: Props) => {
  const link = `https://www.youtube.com/watch?v=${videoId}`;
  return (
    <ModalContent>
      <ModalHeader> {title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SimplePlayer link={link} />
      </ModalBody>
      <ModalFooter>
        <Spacer />
        <Button colorScheme="blue" mr={3} onClick={add}>
          Add <Icon ml="2" as={SiAddthis} />
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default PreviewBody;
