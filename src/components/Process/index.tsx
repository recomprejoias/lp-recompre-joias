'use client'

import { useRef } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Button } from '../Button'
import { openWhatsappGroup } from '../../lib/whatsapp'
import { useSectionReveal } from '../../lib/useSectionReveal'

const processItems = [
    {
        image: '/process-1.jpeg',
        title: 'Entre no grupo VIP',
        description: 'Primeiro entre no nosso grupo VIP para não perder nenhuma condição especial',
        alt: 'Ícones do WhatsApp e da Recompre Joias',
    },
    {
        image: '/process-2.jpeg',
        title: 'Envie a peça que gostou',
        description: 'Gostou de alguma peça? É só nos enviar no WhatsApp que separamos para você',
        alt: 'Bandeja com anéis e joias em prata',
    },
    {
        image: '/process-3.jpeg',
        title: 'Aprove e pague com segurança',
        description: 'Nosso método de pagamento é rápido e seguro, te enviamos um link feito pelo Mercado Pago após a aprovação, enviamos o seu pedido pelos Correios com contratação de seguro',
        alt: 'Joias delicadas posicionadas sobre uma superfície clara',
    },
    {
        image: '/process-4.jpeg',
        title: 'Receba sua compra',
        description: 'Receba sua compra no conforto da sua casa e seja feliz com sua nova joia',
        alt: 'Cliente recebendo uma joia em casa',
    },
]

const ProcessContainer = styled.section`
    width: 100%;
    background: var(--color-black);
    display: flex;
    justify-content: center;
    padding: 72px 48px;

    @media (max-width: 768px) {
        padding: 48px 24px;
    }

    .process__inner {
        width: 100%;
        max-width: 1600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 56px;

        @media (max-width: 768px) {
            gap: 40px;
        }
    }

    .process__hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 28px;
        text-align: center;

        @media (max-width: 768px) {
            gap: 24px;
        }
    }

    .process__title {
        margin: 0;
        color: var(--color-white);
        font-family: var(--font-sans);
        font-size: 48px;
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.04em;
        max-width: 620px;

        @media (max-width: 768px) {
            font-size: 32px;
            max-width: 320px;
        }

        strong {
            font-weight: 200;
            font-style: italic;
            font-family: var(--font-serif);
        }
    }

    .process__list {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;

        @media (max-width: 768px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 24px;
        }
    }

    .process__item {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 22px;
        text-align: center;
        transition: transform 0.35s ease;

        &:hover {
            transform: translateY(-4px);
        }

        @media (max-width: 768px) {
            width: 100%;
            gap: 18px;
        }
    }

    .process__item-image-wrap {
        width: 100%;
        aspect-ratio: 1;
        position: relative;
        overflow: hidden;
        background: rgba(242, 239, 233, 0.08);
    }

    .process__item-image {
        object-fit: cover;
        transition: transform 0.8s ease;
    }

    .process__item:hover .process__item-image {
        transform: scale(1.04);
    }

    .process__item-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        max-width: 320px;
    }

    .process__item-title {
        margin: 0;
        color: var(--color-white);
        font-family: var(--font-sans);
        font-size: 24px;
        font-weight: 300;
        line-height: 1.1;
        letter-spacing: -0.03em;

        @media (max-width: 768px) {
            font-size: 22px;
            max-width: 320px;
        }

        strong {
            font-weight: 200;
            font-style: italic;
            font-family: var(--font-serif);
        }
    }

    .process__item-description {
        margin: 0;
        color: rgba(242, 239, 233, 0.7);
        font-family: var(--font-sans);
        font-size: 16px;
        font-weight: 300;
        line-height: 1.05;
        max-width: 320px;

        @media (max-width: 768px) {
            font-size: 14px;
        }
    }
`

export function Process() {
    const sectionRef = useRef<HTMLElement>(null)

    useSectionReveal(sectionRef)

    return <ProcessContainer id='como-funciona' ref={sectionRef}>
        <div className='process__inner'>
            <div className='process__hero'>
                <h2 className='process__title' data-animate='fade-up'>
                    Para comprar suas <strong>joias</strong> é fácil e simples!
                </h2>
                <Button onClick={openWhatsappGroup} variant='white' data-animate='soft'>Entrar no grupo VIP</Button>
            </div>
            <div className='process__list'>
                {processItems.map((item) => (
                    <article className='process__item' data-animate='soft' key={item.title}>
                        <div className='process__item-image-wrap'>
                            <Image
                                alt={item.alt}
                                className='process__item-image'
                                fill
                                sizes='(max-width: 768px) 100vw, 33vw'
                                src={item.image}
                            />
                        </div>
                        <div className='process__item-content'>
                            <h3 className='process__item-title'>
                                {item.title === 'Entre no grupo VIP' && <>Entre no grupo <strong>VIP</strong></>}
                                {item.title === 'Envie a peça que gostou' && <>Envie a <strong>peça</strong> que gostou</>}
                                {item.title === 'Aprove e pague com segurança' && <>Aprove e pague com <strong>segurança</strong></>}
                                {item.title === 'Receba sua compra' && <>Receba sua <strong>compra</strong></>}
                            </h3>
                            <p className='process__item-description'>{item.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </ProcessContainer>
}
