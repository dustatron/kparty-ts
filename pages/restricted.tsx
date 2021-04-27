import React from "react";
import Navbar from "../components/Navbar";
import {
  SimpleGrid,
  Heading,
  Container,
  Box,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";

const restricted = () => {
  return (
    <>
      <Navbar heading={"Living room karaoke parties just got easier"} />
      <Container maxW={"3xl"}>
        <SimpleGrid columns={2} spacing={6} p="8">
          <Box>
            <Heading>You must Sign In First</Heading>
            <Text>
              In order to keep track of the songs you add we need you to sign
              in.
            </Text>
          </Box>
          <Box>
            <Button size="lg" width="10em">
              Sign In
            </Button>
          </Box>
        </SimpleGrid>
        <Divider />
      </Container>
    </>
  );
};

export default restricted;
