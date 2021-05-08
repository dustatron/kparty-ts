import React, { FC } from "react";
import Link from "next/link";
import {
  Container,
  Center,
  Flex,
  Spacer,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

type Props = {
  heading: string;
};

const Navbar: FC<Props> = ({ heading }) => {
  return (
    <>
      <Box>
        <Container maxW="container.md">
          <Flex>
            <Box p="1">
              <Link href="/">
                <a>
                  <Text fontSize="24px">
                    K<strong>Party</strong>
                  </Text>
                </a>
              </Link>
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
          {heading}
        </Center>
      </Box>
    </>
  );
};

export default Navbar;
