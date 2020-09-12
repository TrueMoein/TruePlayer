import React, { useEffect } from "react"
import TruePlayer from "trueplayer"

const IndexPage = () => {
  useEffect(() => {
    const player = new TruePlayer("player")
    player.seek(10)
  }, [])

  return (
    <div>
      <h1>Taddaaaa</h1>

      <video
        id="player"
        autoPlay
        width="400"
        src="http://localhost:6060/media/e10b9839-90a2-426e-8427-1afc3cec2c7a_SatSep122020.mp4"
        controls
      />
    </div>
  )
}

export default IndexPage
