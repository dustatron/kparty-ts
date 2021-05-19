import React, { useState } from "react";
import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Box,
  Icon,
  Wrap,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useFetchYT, IUseFetchYT } from "../../utils";
import SongSearchResultBox from "../SongSearchResultBox";
import { useFirestoreAction, useAuth } from "../../utils";
import { useRouter } from "next/router";

interface Props {
  changeTab: (index: number) => void;
}

export const SongSearch = ({ changeTab }: Props) => {
  const [inputData, setInputData] = useState<string>("");
  const { error, isLoading, runSearch, results }: IUseFetchYT = useFetchYT();
  const { currentUser } = useAuth();

  const router = useRouter();
  const { roomId } = router.query;

  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(inputData);
  };

  return (
    <>
      <Box border="1px" borderRadius="lg" p="4">
        <form onSubmit={handleSearch}>
          <Wrap>
            <Box w="75%">
              <FormControl id="first-name" isRequired>
                <FormLabel>Search for a song</FormLabel>
                <Input
                  placeholder="Search Title"
                  disabled={isLoading}
                  value={inputData}
                  onChange={(e) => {
                    setInputData(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <Box w="20%" paddingTop="1.85rem">
              <Button type="submit" isLoading={isLoading}>
                <Icon as={FiSearch} marginRight="5px" /> Search
              </Button>
            </Box>
          </Wrap>
        </form>
      </Box>
      {results &&
        results.map((video) => {
          return (
            <SongSearchResultBox
              videoData={video}
              changeTab={changeTab}
              authorId={currentUser.uid}
              user={currentUser}
              roomId={roomId}
            />
          );
        })}
      {results?.length === 0 && !isLoading && (
        <Heading w="100%" textAlign="center" p="5" size="sm">
          No Search Results
        </Heading>
      )}

      {error && <Heading>Error: {error}</Heading>}
    </>
  );
};

export default SongSearch;
