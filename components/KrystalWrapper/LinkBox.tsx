import Link from "next/link"
import Image from "next/image"
import {
  VStack,
  Box,
  Heading,
  Container,
  Text,
  Button,
  createIcon,
  Icon,
  Flex,
  Divider,
  SimpleGrid,
  Wrap,
} from "@chakra-ui/react"
import { CgPlayListAdd } from "react-icons/cg"
import { MdOndemandVideo } from "react-icons/md"

interface Props {
  title: string
  subTitle: string
  img: string
  btnLink: string
}

const LinkBox = ({ title, subTitle, img, btnLink }: Props) => {
  return (
    <Link href={btnLink}>
      <a>
        <VStack
          background="white"
          borderWidth="1px"
          borderRadius="lg"
          p="3"
          marginBottom="3"
        >
          {img === "playlist" && <Icon as={CgPlayListAdd} h={50} w={50} />}
          {img === "Player" && <Icon as={MdOndemandVideo} h={50} w={50} />}
          <Heading as="h4" size="md">
            {title}
          </Heading>
          <Text align="center">{subTitle}</Text>
        </VStack>
      </a>
    </Link>
  )
}

export default LinkBox
