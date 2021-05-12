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
import { IAuth, useAuth } from "../../utils";

type Props = {
  heading: string;
};

const Navbar: FC<Props> = ({ heading }) => {
  const { login, logout, currentUser, loading }: IAuth = useAuth();
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
              {!!currentUser && (
                <Button variant="ghost" onClick={logout}>
                  Sign Out
                </Button>
              )}
              {!currentUser && (
                <Button variant="ghost" onClick={login} isLoading={loading}>
                  Sign In
                </Button>
              )}
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
