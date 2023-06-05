import React from "react";
import { ISong, IVideoData } from "../../utils";
import SongSearch from "../SongSearch";

interface Props {
  handleTabsChange: (index: number) => void;
  handleShowPreview: (songData: IVideoData, handleSave: any) => void;
  roomId: string;
  isKJ: boolean;
}

export const Search = ({
  handleShowPreview,
  handleTabsChange,
  roomId,
  isKJ,
}: Props) => (
  <SongSearch
    changeTab={handleTabsChange}
    handleShowPreview={handleShowPreview}
    roomId={roomId}
    isKJ={isKJ}
  />
);
