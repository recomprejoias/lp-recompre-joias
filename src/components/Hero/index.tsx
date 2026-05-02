'use client'

import { useRef } from 'react'
import styled from '@emotion/styled'
import { VideoPlayer } from '../VideoPlayer'
import { Button } from '../Button'
import { openWhatsappGroup } from '../../lib/whatsapp'
import { useSectionReveal } from '../../lib/useSectionReveal'

const HeroContainer = styled.section`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding: 96px;

    @media (max-width: 768px) {
        padding: 48px 24px;
    }

    .hero__video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;

        &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 70%;   
            background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);

            @media (max-width: 768px) {
                height: 50%;
            }
        }
    }

    & .hero__content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 32px;

        @media (max-width: 768px) {
            gap: 24px;
        }

        &-title {
            font-size: 62px;
            font-weight: 300;
            color: var(--color-white);
            text-align: center;
            letter-spacing: -0.04em;
            line-height: 100%;
            font-family: var(--font-sans);
            max-width: 820px;

            @media (max-width: 768px) {
                font-size: 32px;
            }

            & strong {
                font-weight: 200;
                font-style: italic;
                font-family: var(--font-serif);
            }
        }

        &-description {
            font-size: 18px;
            font-weight: 300;
            color: rgba(242, 239, 233, 0.82);
            text-align: center;
            max-width: 700px;
            font-family: var(--font-sans);
            line-height: 120%;

            @media (max-width: 768px) {
                font-size: 16px;
            }
        }
    }
`

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null)

    useSectionReveal(sectionRef)

    return <HeroContainer id='inicio' ref={sectionRef}>

        <VideoPlayer src="/hero-video.mp4" mobileSrc="/hero-video-mobile.mp4" poster="/hero-image.jpg" className='hero__video' playbackRate={1} />
        <main className='hero__content'>
            <h1 className='hero__content-title' data-animate='fade-up'>
                Compre joias de 18k por um preço <strong>totalmente</strong> acessível
            </h1>
            <p className='hero__content-description' data-animate='soft'>
                Ouro totalmente autentico e com selo de qualidade garantida, somos referência no mercado de joias no Brasil
            </p>
            <Button onClick={openWhatsappGroup} variant='white' data-animate='soft'>Comprar joias</Button>
        </main>
    </HeroContainer>
}
