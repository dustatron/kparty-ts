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
import { fetchYTSongs, IVideoData } from "../../utils";
import SongSearchResultBox from "../SongSearchResultBox";

interface Props {}

export const SongSearch = (props: Props) => {
  const [isShowingSpinner, setIsShowingSpinner] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string>("");
  const [searchData, setSearchData] = useState<IVideoData[] | null>(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await fetchYTSongs(
      setIsShowingSpinner,
      inputData.toLocaleLowerCase()
    );
    setSearchData(results);
  };

  return (
    <>
      <Box border="1px" borderRadius="lg" p="4">
        <form onSubmit={handleSearch}>
          <FormControl id="first-name" isRequired>
            <FormLabel>Search for a song</FormLabel>
            <Input
              placeholder="Search Title"
              disabled={isShowingSpinner}
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
          </FormControl>
          <Button type="submit" isLoading={isShowingSpinner}>
            <Icon as={FiSearch} marginRight="5px" /> Search
          </Button>
        </form>
      </Box>
      {searchData &&
        searchData.map((video) => {
          return <SongSearchResultBox videoData={video} />;
        })}
      {searchData?.length === 0 && !isShowingSpinner && (
        <Heading w="100%" textAlign="center" p="5" size="sm">
          No Search Results
        </Heading>
      )}
    </>
  );
};

export default SongSearch;
