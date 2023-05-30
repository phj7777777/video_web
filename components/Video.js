import { useRef, useEffect } from 'react'
import Link from 'next/link'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default function VidePlayer() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videojs(videoRef.current, {
        sources: [
          {
            src: 'https://stream.mux.com/GJjLF93MGEmq4VfidIdZ4oMMAJRhEjSQ.m3u8',
            type: 'application/x-mpegURL',
          },
        ],
        fluid: true,
      })
    }
  })

  return (
    <div>
      <video
        controls
        ref={videoRef}
        className="video-js vjs-default-skin  vjs-control-bar "
        preload="auto"
        width="640"
        height="268"
      />
    </div>
  )
}
