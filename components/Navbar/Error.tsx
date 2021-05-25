import { FC } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/firebase-auth";

interface Props {
  error: FirebaseError;
  hideMessage: () => void;
}

const Error: FC<Props> = ({ error, hideMessage }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Error Signing In</AlertTitle>
      <AlertDescription>
        {error?.code} : {error?.message}
      </AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={hideMessage}
      />
    </Alert>
  );
};

export default Error;
