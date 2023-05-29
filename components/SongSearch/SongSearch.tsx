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
import React, { useState } from "react";

import { FiSearch } from "react-icons/fi";
import SongSearchResultBox from "../SongSearchResultBox";
import { useAuth } from "../../utils";
import { useFetchYT } from "../../utils/useFetchYT";

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
  const { data: results, isLoading, error, refetch } = useFetchYT(inputData);
  const { currentUser } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const clearInput = () => {
    setInputData("");
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
      {results?.length === 0 && !isLoading && (
        <Heading w="100%" textAlign="center" p="5" size="sm">
          No Search Results
        </Heading>
      )}

      {error && (
        <Heading>
          <>Error: {error}</>
        </Heading>
      )}
    </>
  );
};

export default SongSearch;
