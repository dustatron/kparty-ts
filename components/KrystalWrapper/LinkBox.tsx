import Link from "next/link"
import {
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
  btnCopy: string
  btnLink: string
}

const LinkBox = ({ title, subTitle, btnCopy, btnLink }: Props) => {
  return (
    <Box bg="white" borderRadius="md" h="87px" p="3" marginBottom="1rem">
      <Flex>
        <Box w="90%">
          <Heading as="h4" size="md">
            {title}
          </Heading>
          <Divider p="1" />
          <Wrap p="2">{subTitle}</Wrap>
        </Box>
        <Box p="3">
          <Link href={btnLink}>
            <a>
              <Button colorScheme="blue">{btnCopy}</Button>
            </a>
          </Link>
        </Box>
      </Flex>
    </Box>
  )
}

export default LinkBox
