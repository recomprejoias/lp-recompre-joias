'use client'

import { useEffect, useRef, useState } from 'react'
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
    const [isMobileViewport, setIsMobileViewport] = useState(false)

    useEffect(() => {
        if (!mobileSrc) {
            return
        }

        const mediaQuery = window.matchMedia('(max-width: 768px)')
        const updateViewport = (event?: MediaQueryListEvent) => {
            setIsMobileViewport(event ? event.matches : mediaQuery.matches)
        }

        updateViewport()

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', updateViewport)

            return () => {
                mediaQuery.removeEventListener('change', updateViewport)
            }
        }

        mediaQuery.addListener(updateViewport)

        return () => {
            mediaQuery.removeListener(updateViewport)
        }
    }, [mobileSrc])

    const resolvedSrc = isMobileViewport && mobileSrc ? mobileSrc : src

    useEffect(() => {
        if (!videoRef.current) {
            return
        }

        videoRef.current.load()
        videoRef.current.playbackRate = playbackRate

        const playPromise = videoRef.current.play()
        if (playPromise) {
            void playPromise.catch(() => {})
        }
    }, [playbackRate, resolvedSrc])

    return (
        <VideoPlayerContainer className={className}>
            <VideoElement
                ref={videoRef}
                src={resolvedSrc}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
            />
        </VideoPlayerContainer>
    )
}
