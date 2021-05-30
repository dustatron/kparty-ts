import React, { ReactElement } from "react";
import {
  VStack,
  Heading,
  Center,
  Box,
  Button,
  Divider,
  Text,
} from "@chakra-ui/react";
import { GrGoogle } from "react-icons/gr";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useAuth, IAuth } from "../../utils";
import { RoomList } from "../RoomList";

export const SignInBox = (): ReactElement => {
  const { login, currentUser }: IAuth = useAuth();
  return (
    <>
      <Center py={6}>
        <Box
          boxShadow={"xl"}
          border="1px"
          maxW={currentUser ? "500px" : "300px"}
          w={"full"}
          rounded={"lg"}
          p="6"
          textAlign="center"
        >
          <VStack columns={2} spacing={6} p="4">
            {!currentUser && <Heading as="h2">Sign In</Heading>}
            {currentUser && (
              <>
                <Heading as="h1"> Hey {currentUser.displayName} </Heading>
                <Text fontSize="26px" fontWeight="regular">
                  Join a room{" "}
                </Text>
              </>
            )}
            <Divider />
            {currentUser && <RoomList />}

            {!currentUser && (
              <>
                <Button
                  leftIcon={<GrGoogle />}
                  size="lg"
                  colorScheme="blue"
                  w="100%"
                  onClick={login}
                >
                  With Google
                </Button>
                {/* <Button
                  colorScheme="facebook"
                  size="lg"
                  w="100%"
                  leftIcon={<FaFacebook />}
                >
                  With Facebook
                </Button>
                <Button
                  colorScheme="twitter"
                  size="lg"
                  w="100%"
                  leftIcon={<FaTwitter />}
                >
                  With Twitter
                </Button> */}
              </>
            )}
          </VStack>
        </Box>
      </Center>
    </>
  );
};
