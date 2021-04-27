import React from "react";
import {
  Container,
  Center,
  Flex,
  Spacer,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <Box>
        <Container maxW="container.md">
          <Flex>
            <Box p="1">
              <Text fontSize="24px">
                K<strong>Party</strong>
              </Text>
            </Box>
            <Spacer />
            <Box p="1" fontSize="20px">
              <Button variant="ghost">Sign In</Button>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box background="#333333">
        <Center h="50px" fontWeight="600" color="#C1C1C1">
          Living room karaoke parties just got easier
        </Center>
      </Box>
    </>
  );
};

export default Navbar;
