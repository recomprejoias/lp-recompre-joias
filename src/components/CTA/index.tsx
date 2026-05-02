'use client'

import { useRef } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Button } from '../Button'
import { openWhatsappGroup } from '../../lib/whatsapp'
import { useSectionReveal } from '../../lib/useSectionReveal'

const CTAContainer = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0;
    height: 45dvh;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        height: auto;
    }

    & .bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background-color: var(--color-black); 
        z-index: -1;
    }
    
    & .cta__image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: transform 0.9s ease;

        @media (max-width: 768px) {
            width: 100%;
            height: 400px;
            position: relative;
        }
    }

    &:hover .cta__image {
        transform: scale(1.02);
    }

    & .cta__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 32px;
        width: 100%;
        padding: 96px 48px;

        @media (max-width: 768px) {
            gap: 24px;
            padding: 48px 24px;
        }

        &-title {
            font-size: 48px;
            font-weight: 300;
            color: var(--color-white);
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
            color: rgba(242, 239, 233, 0.82);
            text-align: left;
            max-width: 600px;
            font-family: var(--font-sans);
            line-height: 120%;

            @media (max-width: 768px) {
                font-size: 16px;
            }
        }
    }
`

export function CTA() {
    const sectionRef = useRef<HTMLElement>(null)

    useSectionReveal(sectionRef)

    return <CTAContainer ref={sectionRef}>
        <div className='bg'></div>
        <Image src="/sec-4-maoes.png" alt="Mãos segurando uma joia" width={1600} height={900} className='cta__image' data-animate='fade-right' />
        <div className='cta__content'>
            <h1 className='cta__content-title' data-animate='fade-left'>
                Feche pelo site e garanta um <strong>preço</strong> exclusivo
            </h1>
            <p className='cta__content-description' data-animate='soft'>
                Com variedades de opções e soluções totalmente personalizadas, nosso time entrega o melhor resultado
            </p>
            <Button onClick={openWhatsappGroup} variant='white' data-animate='soft'>Comprar joias</Button>
        </div>
    </CTAContainer>
}
