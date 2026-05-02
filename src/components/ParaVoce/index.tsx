'use client'

import { useRef } from 'react'
import styled from '@emotion/styled'
import { Button } from '../Button'
import Image from 'next/image'
import { openWhatsappGroup } from '../../lib/whatsapp'
import { useSectionReveal } from '../../lib/useSectionReveal'

const ParaVoceContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1600px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    padding: 48px 0 48px 48px;
    gap: 96px;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 48px 0 0 0;
        gap: 48px;
    }

    & .para-voce__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 32px;
        width: 100%;

        @media (max-width: 768px) {
            gap: 24px;
            padding: 0 24px;
        }

        &-title {
            font-size: 48px;
            font-weight: 300;
            color: var(--color-black);
            text-align: left;
            letter-spacing: -0.04em;
            line-height: 100%;
            font-family: var(--font-sans);
            max-width: 620px;

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
            color: rgba(5, 5, 5, 0.72);
            text-align: left;
            max-width: 600px;
            font-family: var(--font-sans);
            line-height: 120%;

            @media (max-width: 768px) {
                font-size: 16px;
            }
        }
    }

    & .para-voce__images {
        display: flex;
        gap: 4px;
        flex-direction: column;
        width: 100%;

        &-frame {
            overflow: hidden;
        }

        &-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            transition: transform 0.8s ease;

            @media (max-width: 768px) {
                height: 200px;
            }
        }

        &-frame:hover &-image {
            transform: scale(1.04);
        }
    }
`

export function ParaVoce() {
    const sectionRef = useRef<HTMLElement>(null)

    useSectionReveal(sectionRef)

    return <ParaVoceContainer id='para-voce' ref={sectionRef}>
        <div className='para-voce__content'>
            <h1 className='para-voce__content-title' data-animate='fade-right'>
                Ideal para <strong>você</strong> que deseja faturar mais
            </h1>
            <p className='para-voce__content-description' data-animate='soft'>
                Com variedades de opções e soluções totalmente personalizadas, nosso time entrega o melhor resultado
            </p>
            <Button onClick={openWhatsappGroup} variant='black' data-animate='soft'>Comprar joias</Button>
        </div>
        <div className='para-voce__images'>
            <div className='para-voce__images-frame' data-animate='scale'>
                <Image src="/sec-2-anel-suave.png" alt="Imagem 1" width={500} height={500} className='para-voce__images-image' />
            </div>
            <div className='para-voce__images-frame' data-animate='scale' data-animate-delay='0.08'>
                <Image src="/sec-2-cordao-suave.png" alt="Imagem 2" width={500} height={500} className='para-voce__images-image' />
            </div>
        </div>
    </ParaVoceContainer>
}
