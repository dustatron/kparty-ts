import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  VStack,
} from "@chakra-ui/react";
import { IUseFetchYT, useFetchYT } from "../../utils";
import React, { useState } from "react";

import { FiSearch } from "react-icons/fi";
import SongSearchResultBox from "../SongSearchResultBox";
import { useAuth } from "../../utils";

interface Props {
  changeTab: (index: number) => void;
  handleShowPreview: (link, title, handleSave) => void;
  roomId: string;
  isKJ: boolean;
}

export const SongSearch = ({
  changeTab,
  handleShowPreview,
  roomId,
  isKJ,
}: Props) => {
  const [inputData, setInputData] = useState<string>("");
  const { error, isLoading, runSearch, results, clearResults }: IUseFetchYT =
    useFetchYT();
  const { currentUser } = useAuth();

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
      <Box
        border={{ base: "none", sm: "none", md: "1px" }}
        borderRadius={{ base: "none", sm: "none", md: "sm" }}
        borderBottom="1px"
        p="1"
        borderColor={{ base: "none", sm: "black", md: "gray.300" }}
      >
        <form onSubmit={handleSearch}>
          <VStack justify="center" p="2">
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
      <Box p={{ base: "1", sm: "2", md: "0" }} bgColor="gray.50">
        {results &&
          results.map((video, index) => {
            return (
              <SongSearchResultBox
                key={`${index}-${video.title}`}
                videoData={video}
                changeTab={changeTab}
                authorId={currentUser.uid}
                user={currentUser}
                roomId={roomId as string}
                clear={clearInput}
                handleShowPreview={handleShowPreview}
                isKJ={isKJ}
              />
            );
          })}
      </Box>
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
