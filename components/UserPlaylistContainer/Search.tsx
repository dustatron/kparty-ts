import React from "react";
import { ISong, IVideoData } from "../../utils";
import SongSearch from "../SongSearch";

interface Props {
  handleTabsChange: (index: number) => void;
  handleShowPreview: (songData: IVideoData, handleSave: any) => void;
}

export const Search = ({ handleTabsChange }: Props) => (
  <SongSearch changeTab={handleTabsChange} />
);
