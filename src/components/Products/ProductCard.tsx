'use client'

import styled from '@emotion/styled'
import { Button } from '../Button'
import { openWhatsappGroup } from '../../lib/whatsapp'

interface ProductCardProps {
    image: string
    watermark: string
    title: string
}

const Card = styled.article`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    transition: transform 0.35s ease;

    &:hover {
        transform: translateY(-4px);
    }

    .product-card__media {
        position: relative;
        width: 100%;
        height: 420px;
        background: var(--color-black);
        overflow: hidden;
    }

    .product-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.7s ease;

        @media (max-width: 768px) {
            height: 420px;
        }
    }

    &:hover .product-card__image {
        transform: scale(1.03);
    }

    .product-card__watermark {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 36px;
        height: 36px;
        object-fit: contain;
        opacity: 0.9;
        pointer-events: none;
    }

    .product-card__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }

    .product-card__title {
        margin: 0;
        color: var(--color-black);
        font-family: var(--font-sans);
        font-size: 20px;
        line-height: 1.05;
        font-weight: 300;

        @media (max-width: 768px) {
            font-size: 22px;
        }
    }

    .product-card__cta {
        font-size: 14px;
        font-weight: 300;
        line-height: 1.2;
        border-bottom: 1px solid rgba(5, 5, 5, 0.2);
        border-radius: 0;
        padding-bottom: 6px;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }
`

export function ProductCard({ image, watermark, title }: ProductCardProps) {
    return (
        <Card className='product-card' data-animate='soft'>
            <div className='product-card__media'>
                <img className='product-card__image' src={image} alt={title} />
                <img className='product-card__watermark' src={watermark} alt='' aria-hidden='true' />
            </div>
            <div className='product-card__content'>
                <h3 className='product-card__title'>{title}</h3>
                <Button className='product-card__cta' onClick={openWhatsappGroup} variant='ghost'>
                    Solicitar orçamento
                </Button>
            </div>
        </Card>
    )
}