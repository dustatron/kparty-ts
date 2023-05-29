import React, { ReactElement } from "react";
import Link from "next/link";
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
import { SiGithub } from "react-icons/si";
import { useAuth, IAuth } from "../../utils";

export const SignInBox = (): ReactElement => {
  const { login, currentUser, loginWithGithub }: IAuth = useAuth();
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
          <VStack spacing={6}>
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
            {currentUser && (
              <Box>
                <Link href="/">
                  <a>
                    <Button fontSize="24px">See the list of Parties</Button>
                  </a>
                </Link>
              </Box>
            )}

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

                <Button
                  colorScheme="twitter"
                  size="lg"
                  w="100%"
                  leftIcon={<SiGithub />}
                  onClick={loginWithGithub}
                >
                  With Github
                </Button>
              </>
            )}
          </VStack>
        </Box>
      </Center>
    </>
  );
};
