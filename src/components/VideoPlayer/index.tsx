'use client'

import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'

const VideoPlayerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
`

interface VideoPlayerProps {
    src: string
    mobileSrc?: string
    poster?: string
    className?: string
    playbackRate?: number
}

export function VideoPlayer({ src, mobileSrc, poster, className, playbackRate = 1 }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate
        }
    }, [playbackRate])

    return (
        <VideoPlayerContainer className={className}>
            <VideoElement
                ref={videoRef}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
            >
                {mobileSrc && <source src={mobileSrc} media="(max-width: 768px)" />}
                <source src={src} />
            </VideoElement>
        </VideoPlayerContainer>
    )
}
