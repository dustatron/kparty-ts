import React, { useEffect, useState } from "react"
import { Heading, Container, Button } from "@chakra-ui/react"

const sub = () => {
  const [hasHost, setHasHost] = useState(null)

  const getHost = () => {
    if (window) {
      const { host } = window.location
      const splitHost = host.split(".")[0]
      console.log("location", window.location)
      setHasHost(splitHost)
    }
  }

  useEffect(() => {
    getHost()
  }, [])

  return (
    <Container>
      <Heading>Sub Domain</Heading>
      {hasHost && hasHost}
      <Button onClick={getHost}>Get Host</Button>
    </Container>
  )
}

export default sub
