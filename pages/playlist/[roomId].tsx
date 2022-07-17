import React, { FC, useEffect, useState } from "react"

import PlaylistWrapper from "../../components/PlaylistWrapper"
import WithAuth from "../../components/WithAuth"
import { useRouter } from "next/router"

interface Props {
  setTitle: (title: string) => void
}

const playlist: FC<Props> = ({ setTitle }) => {
  const router = useRouter()
  const { roomId } = router.query
  return <PlaylistWrapper setTitle={setTitle} roomId={roomId} />
}

export default WithAuth(playlist)
