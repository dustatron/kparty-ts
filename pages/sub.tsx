import React, { useEffect, useState } from "react";
import { Heading, Container, Flex, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";

const sub = () => {
  const router = useRouter();
  const [hasSubdomain, setHasHost] = useState(null);
  const [value, setValue] = useState(null);

  const getSubdomain = () => {
    const { host } = window.location;
    const splitHost = host.split(".");
    if (splitHost.length === 3 && splitHost[0] !== "www") {
      setHasHost(splitHost[0]);
    } else {
      setHasHost("No Subdomain");
    }
  };

  const push = () => {
    window.location.href = `http://${value}.kpdev.com:3000/sub`;
  };

  useEffect(() => {
    let linkToken = router.query.edit;
    const { host } = window.location;
    if (window) {
      getSubdomain();
    }
  }, []);

  return (
    <Container>
      <Heading>Sub Domain</Heading>
      {hasSubdomain && hasSubdomain}
      <Flex>
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <Button marginLeft="4px" onClick={push}>
          Add Domain
        </Button>
      </Flex>
    </Container>
  );
};

export default sub;
