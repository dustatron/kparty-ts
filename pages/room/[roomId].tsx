import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Center,
  Heading,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";

const room = ({ setTitle }) => {
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    setTitle(roomId);
  }, []);

  return (
    <Container maxW={"3xl"}>
      <Center h="5rem">
        <Heading as="h4" size="md">
          What do you want to do?{" "}
        </Heading>
      </Center>
      <SimpleGrid columns={[1, null, 2]} spacing={8}>
        <Link href={`/playlist/${roomId}`}>
          <a>
            <VStack borderWidth="1px" borderRadius="lg" p="5" h="15rem">
              <Image
                src="/playlist.png"
                alt="Picture of the author"
                width={100}
                height={100}
              />
              <Heading as="h4" size="md">
                Add Music
              </Heading>
              <Text align="center">
                search for songs and add them to the rooms playlist.
              </Text>
            </VStack>
          </a>
        </Link>
        <Link href={`/player/${roomId}`}>
          <a>
            <VStack borderWidth="1px" borderRadius="lg" p="5" h="15rem">
              <Image
                src="/player.png"
                alt="Picture of the author"
                width={100}
                height={100}
              />
              <Heading as="h4" size="md">
                Main Screen
              </Heading>
              <Text align="center">
                A shared screen for everyone to sing from.
              </Text>
            </VStack>
          </a>
        </Link>
      </SimpleGrid>
    </Container>
  );
};

export default room;
