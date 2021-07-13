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
  Flex,
  Divider,
  SimpleGrid,
  Wrap,
} from "@chakra-ui/react"

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
          <Image
            src={`/${img}.png`}
            alt="Picture of the author"
            width={70}
            height={70}
          />
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
