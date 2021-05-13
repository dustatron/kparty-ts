import React from "react";
import {
  SimpleGrid,
  Heading,
  Container,
  Center,
  Box,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useAuth, IAuth } from "../utils";

const restricted = () => {
  const { login }: IAuth = useAuth();
  return (
    <Container maxW={"3xl"}>
      <SimpleGrid columns={2} spacing={6} p="8">
        <Box>
          <Heading>You must Sign In First</Heading>
          <Text>
            In order to keep track of the songs you add we need you to sign in.
          </Text>
        </Box>
        <Box>
          <Center h="100%">
            <Button size="lg" width="10em" colorScheme="blue" onClick={login}>
              Sign In
            </Button>
          </Center>
        </Box>
      </SimpleGrid>
      <Divider />
    </Container>
  );
};

export default restricted;
