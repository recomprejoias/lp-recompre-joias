'use client'

import { useRef } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Button } from '../Button'
import { openWhatsappGroup } from '../../lib/whatsapp'
import { useSectionReveal } from '../../lib/useSectionReveal'

const aboutImages = [
    '/sec-5-image-1.png',
    '/sec-5-image-2.png',
    '/sec-5-image-3.png',
    '/sec-5-image-4.png',
]

const AboutContainer = styled.section`
    width: 100%;
    max-width: 1600px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
    align-items: center;
    gap: 64px;
    padding: 48px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 0 0 48px 0;
    }

    .about__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 28px;
        width: 100%;
        order: 2;

        @media (max-width: 768px) {
            order: 1;
            gap: 24px;
            padding: 48px 24px 0;
        }
    }

    .about__title {
        margin: 0;
        color: var(--color-black);
        font-family: var(--font-sans);
        font-size: 48px;
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.04em;

        @media (max-width: 768px) {
            font-size: 32px;
        }

        strong {
            font-weight: 200;
            font-style: italic;
            font-family: var(--font-serif);
        }
    }

    .about__description {
        display: flex;
        flex-direction: column;
        gap: 20px;
        color: rgba(5, 5, 5, 0.72);
        font-family: var(--font-sans);
        font-size: 18px;
        font-weight: 300;
        line-height: 1.12;
        max-width: 580px;

        @media (max-width: 768px) {
            gap: 18px;
            font-size: 16px;
        }

        p {
            margin: 0;
        }

        strong {
            color: var(--color-black);
            font-weight: 500;
        }
    }

    .about__grid-wrap {
        width: 100%;
        position: relative;
        order: 1;

        @media (max-width: 768px) {
            order: 2;
        }
    }

    .about__grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 2px;
        width: 100%;
        background: rgba(5, 5, 5, 0.08);
    }

    .about__grid-item {
        position: relative;
        aspect-ratio: 1;
        overflow: hidden;
        background: #d6d0c7;

        &:hover .about__grid-image {
            transform: scale(1.04);
        }
    }

    .about__grid-image {
        object-fit: cover;
        transition: transform 0.8s ease;
    }

    .about__stamp {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-black);
        border: 1px solid rgba(242, 239, 233, 0.24);
        z-index: 1;
        transition: transform 0.35s ease, box-shadow 0.35s ease;

        @media (max-width: 768px) {
            width: 56px;
            height: 56px;
        }
    }

    .about__grid-wrap:hover .about__stamp {
        transform: translate(-50%, -50%) scale(1.05);
        box-shadow: 0 14px 32px rgba(5, 5, 5, 0.16);
    }

    .about__stamp-image {
        width: 38px;
        height: 38px;
        object-fit: contain;

        @media (max-width: 768px) {
            width: 30px;
            height: 30px;
        }
    }
`

export function About() {
    const sectionRef = useRef<HTMLElement>(null)

    useSectionReveal(sectionRef)

    return <AboutContainer id='proposito' ref={sectionRef}>
        <div className='about__grid-wrap'>
            <div className='about__grid'>
                {aboutImages.map((image, index) => (
                    <div className='about__grid-item' data-animate='scale' data-animate-delay={String(index * 0.06)} key={image}>
                        <Image
                            alt={`Joia Recompre ${index + 1}`}
                            className='about__grid-image'
                            fill
                            sizes='(max-width: 768px) 50vw, 33vw'
                            src={image}
                        />
                    </div>
                ))}
            </div>
            <div className='about__stamp'>
                <Image
                    alt=''
                    aria-hidden='true'
                    className='about__stamp-image'
                    height={38}
                    src='/logo-recompre-joias-branco.svg'
                    width={38}
                />
            </div>
        </div>
        <div className='about__content'>
            <h2 className='about__title' data-animate='fade-left'>
                Entenda nosso <strong>propósito</strong>
            </h2>
            <div className='about__description' data-animate='soft'>
                <p>
                    A Recompre Joias nasceu com o propósito de oferecer <strong>joias reais</strong> por valores mais acessíveis.
                </p>
                <p>
                    Trabalhamos com peças em <strong>Ouro 18k (750)</strong> e <strong>Prata 925</strong>, sendo joias seminovas (de segunda mão), cuidadosamente selecionadas, com preços acessíveis e com autenticidade garantida.
                </p>
            </div>
            <Button onClick={openWhatsappGroup} variant='black' data-animate='soft'>Comprar joias</Button>
        </div>
    </AboutContainer>
}
