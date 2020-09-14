import React, { useEffect, useRef } from "react"
import { TruePlayer } from "trueplayer"

const IndexPage = () => {
  const video = useRef({})
  useEffect(() => {
    console.log(TruePlayer)
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

      <hr />
      <div>
        <button onClick={() => video.current.pause()}>Toggle</button>
      </div>
    </div>
  )
}

export default IndexPage
