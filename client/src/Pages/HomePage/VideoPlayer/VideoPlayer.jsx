import React, { useRef } from 'react'
import './VideoPlayer.css'
import sampleVid from '../../../Assets/sample.mp4'
const VideoPlayer = ({playState, setPlayState}) => {

const player = useRef(null);

const closePlayer = (e)=> {
   if (e.target == player.current) {
      setPlayState(false);
   }
}

  return (
    <div className={`videoPlayer ${playState?'':'hide'}`} ref={player} onClick={closePlayer}>
       <video src={sampleVid} autoPlay muted controls></video>
    </div>
  )
}

export default VideoPlayer