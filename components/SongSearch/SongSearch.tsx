import React, { useState } from "react";
import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Box,
  Icon,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useFetchYT, IUseFetchYT } from "../../utils";
import SongSearchResultBox from "../SongSearchResultBox";

interface Props {}

export const SongSearch = (props: Props) => {
  const [inputData, setInputData] = useState<string>("");
  const { error, isLoading, runSearch, results }: IUseFetchYT = useFetchYT();

  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(inputData);
  };

  return (
    <>
      <Box border="1px" borderRadius="lg" p="4">
        <form onSubmit={handleSearch}>
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
          <Button type="submit" isLoading={isLoading}>
            <Icon as={FiSearch} marginRight="5px" /> Search
          </Button>
        </form>
      </Box>
      {results &&
        results.map((video) => {
          return <SongSearchResultBox videoData={video} />;
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
