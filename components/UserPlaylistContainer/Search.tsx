import React from "react"
import SongSearch from "../SongSearch"

interface Props {
  handleTabsChange: (index: number) => void
  handleShowPreview: (link: any, title: any, handleSave: any) => void
  roomId: string
  isKJ: boolean
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
)
