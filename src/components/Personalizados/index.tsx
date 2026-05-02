'use client'

import { useRef } from 'react'
import styled from '@emotion/styled'
import { Button } from '../Button'
import Image from 'next/image'
import { openWhatsappGroup } from '../../lib/whatsapp'
import { useSectionReveal } from '../../lib/useSectionReveal'

const PersonalizadosContainer = styled.section`
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 1600px;
    position: relative;
    padding: 48px;
    gap: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 768px) {
        padding: 48px 24px;
        gap: 48px;
    }

    & .personalizados__content {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 24px;
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

        &-div {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 24px;

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
    }

    & .personalizados__images {
        display: flex;
        gap: 4px;
        flex-direction: column;
        align-items: center;
        width: 100%;

        &-frame {
            width: 100%;
            overflow: hidden;

            @media (max-width: 768px) {
                width: 50%;
            }
        }

        @media (max-width: 768px) {
            flex-direction: row;
            gap: 4px;
        }

        &-image {
            width: 100%;
            height: 320px;
            object-fit: cover;
            transition: transform 0.8s ease;

            @media (max-width: 768px) {
                height: 340px;
            }
        }

        &-frame:hover &-image {
            transform: scale(1.04);
        }
    }
`

export function Personalizados() {
    const sectionRef = useRef<HTMLElement>(null)

    useSectionReveal(sectionRef)

    return <PersonalizadosContainer id='personalizacao' ref={sectionRef}>
        <div className='personalizados__content'>
            <h2 className='personalizados__content-title' data-animate='fade-up'>Trabalhamos com joias totalmente <strong>personalizadas</strong></h2>
            <div className='personalizados__content-div'>
                <p className='personalizados__content-div-description' data-animate='soft'>Do seu jeitinho, feito personalizado do jeito que você imaginou!</p>
                <Button onClick={openWhatsappGroup} variant='black' data-animate='soft'>Personalize a sua</Button>
            </div>
        </div>
        <div className='personalizados__images'>
            <div className='personalizados__images-frame' data-animate='scale'>
                <Image src="/sec-3-cordao-personalizado.png" alt="Imagem de joia personalizada 1" width={500} height={500} className='personalizados__images-image' />
            </div>
            <div className='personalizados__images-frame' data-animate='scale' data-animate-delay='0.08'>
                <Image src="/sec-3-pulseira-personalizada.png" alt="Imagem de joia personalizada 2" width={500} height={500} className='personalizados__images-image' />
            </div>
        </div>
    </PersonalizadosContainer>
}
