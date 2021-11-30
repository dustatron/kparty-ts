import React, { useEffect, useState, FC } from "react"
import { useRouter } from "next/router"
import { Container } from "@chakra-ui/react"
import { useRoomData } from "../../utils"
import FavSongModal from "../../components/FavSongModal"
import UserPlaylistContainer from "../../components/UserPlaylistContainer"
import SongEditModal from "../../components/SongEditModal"
import WithAuth from "../../components/WithAuth"
import VideoPreviewModal from "../../components/VideoPreviewModal"
import { Stack, Skeleton } from "@chakra-ui/react"

interface Props {
  setTitle: (title: string) => void
}

const playlist: FC<Props> = ({ setTitle }) => {
  const router = useRouter()
  const { roomId } = router.query
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)
  const [isFavModalShowing, setIsFavModalShowing] = useState<boolean>(false)
  const [isPreviewModalShowing, setIsPreviewModalShowing] =
    useState<boolean>(false)
  const [previewData, setPreviewData] = useState({
    title: "",
    link: "",
    handleAdd: () => {},
  })
  const { roomData, setRoomKey } = useRoomData()

  useEffect(() => {
    setRoomKey(roomId)

    return () => {
      setRoomKey(null)
    }
  }, [roomId])

  useEffect(() => {
    if (roomData) {
      setTitle(`${roomData.title} Playlist`)
    }
  }, [roomData])

  const handleShowModal = (hide?: boolean) => {
    if (hide) {
      setIsModalShowing(false)
    } else {
      setIsModalShowing(true)
    }
  }
  const handleShowFavModal = () => {
    setIsFavModalShowing(true)
  }

  const handleShowPreview = (link, title, handleAdd) => {
    setPreviewData({ link, title, handleAdd })
    setIsPreviewModalShowing(true)
  }

  const handleHideFavModal = () => {
    setIsFavModalShowing(false)
  }

  const handleHidePreviewModal = () => {
    setIsPreviewModalShowing(false)
  }

  return (
    <Container maxW="xl" centerContent p="5">
      {roomData && (
        <UserPlaylistContainer
          playlist={roomData.playlist}
          showModal={handleShowModal}
          showFavModal={handleShowFavModal}
          roomId={roomId}
          currentSong={roomData.currentSong}
          isActive={roomData.isActive}
          handleShowPreview={handleShowPreview}
        />
      )}
      {!roomData && (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
      <SongEditModal
        hideModal={() => handleShowModal(true)}
        isModalShowing={isModalShowing}
      />
      <FavSongModal
        hideFavModal={handleHideFavModal}
        isFavModalShowing={isFavModalShowing}
      />
      <VideoPreviewModal
        previewData={previewData}
        isShowing={isPreviewModalShowing}
        hideModal={handleHidePreviewModal}
      />
    </Container>
  )
}

export default WithAuth(playlist)
