import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import { useAuth, IAuth } from "../../utils";
import { SignInBox } from "../SignInBox";

interface Props {
  WrappedComponent: React.ReactNode;
}

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const { currentUser, isLoading } = useAuth();
    console.log("isLoading", isLoading);
    console.log("currentUser", currentUser);

    if (isLoading) {
      return (
        <Center p="5" h="50vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            size="xl"
          />
        </Center>
      );
    }

    if (!isLoading && currentUser) {
      return <WrappedComponent {...props} />;
    }

    return <SignInBox />;
  };
};

export default WithAuth;
