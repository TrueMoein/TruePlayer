import React, { useEffect, useRef, useState } from "react"
import TruePlayer from "trueplayer"

const IndexPage = () => {
  const player = useRef({})
  const [playerState, setPlayerState] = useState({})

  useEffect(() => {
    player.current = new TruePlayer("player")
    player.current.subscribe(["timeupdate"], setPlayerState)
  }, [])

  useEffect(() => {
    console.log(playerState)
  }, [playerState])

  return (
    <div>
      <h1>{Math.floor(playerState.currentTime)}</h1>

      <video
        id="player"
        autoPlay
        width="400"
        src="http://localhost:6060/media/e10b9839-90a2-426e-8427-1afc3cec2c7a_SatSep122020.mp4"
        controls
      />

      <hr />
      <div>
        <button onClick={() => player.current.togglePlay()}>Toggle</button>
      </div>
    </div>
  )
}

export default IndexPage
