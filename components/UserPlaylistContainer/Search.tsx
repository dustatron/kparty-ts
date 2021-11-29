import React from "react"
import SongSearch from "../SongSearch"

interface Props {
  handleTabsChange: (index: number) => void
  handleShowPreview: (link: any, title: any, handleSave: any) => void
}

export const Search = ({ handleShowPreview, handleTabsChange }: Props) => (
  <SongSearch
    changeTab={handleTabsChange}
    handleShowPreview={handleShowPreview}
  />
)
