import React, { useState } from "react";
import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Box,
  Icon,
  VStack,
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
  const { error, isLoading, runSearch, results, clearResults }: IUseFetchYT =
    useFetchYT();
  const { currentUser } = useAuth();

  const router = useRouter();
  const { roomId } = router.query;

  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(inputData);
  };

  const clearInput = () => {
    setInputData("");
    clearResults();
  };

  return (
    <>
      <Box border="1px" borderRadius="lg" p="5">
        <form onSubmit={handleSearch}>
          <VStack justify="center">
            <Box w="100%">
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
            <Box w="100%">
              <Button type="submit" isLoading={isLoading} size="lg" w="100%">
                <Icon as={FiSearch} marginRight="5px" /> Search
              </Button>
            </Box>
          </VStack>
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
              clear={clearInput}
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
