import { useEffect, useState, FC } from "react"
import { useRouter } from "next/router"
import { Container } from "@chakra-ui/react"
import { useRoomData } from "../../utils"
import FavSongModal from "../../components/FavSongModal"
import UserPlaylistContainer from "../../components/UserPlaylistContainer"
import SongEditModal from "../../components/SongEditModal"
import WithAuth from "../../components/WithAuth"

interface Props {
  setTitle: (title: string) => void
}

const playlist: FC<Props> = ({ setTitle }) => {
  const router = useRouter()
  const { roomId } = router.query
  const [isFavModalShowing, setIsFavModalShowing] = useState<boolean>(false)
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)
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

  const handleShowModal = () => {
    setIsModalShowing(true)
  }
  const handleShowFavModal = () => {
    setIsFavModalShowing(true)
  }

  const handleHideModal = () => {
    setIsModalShowing(false)
  }
  const handleHideFavModal = () => {
    setIsFavModalShowing(false)
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
        />
      )}
      <SongEditModal
        hideModal={handleHideModal}
        isModalShowing={isModalShowing}
      />
      <FavSongModal
        hideFavModal={handleHideFavModal}
        isFavModalShowing={isFavModalShowing}
      />
    </Container>
  )
}

export default WithAuth(playlist)
