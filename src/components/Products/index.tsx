'use client'

import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import gsap from 'gsap'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ProductCard } from './ProductCard'
import { useSectionReveal } from '../../lib/useSectionReveal'

const productGroups = {
    prata: [
        { image: '/product-prata-anel.png', title: 'Anéis de prata 925' },
        { image: '/product-prata-brinco.png', title: 'Brincos de prata 925' },
        { image: '/product-prata-pulseira.png', title: 'Pulseiras de prata 925' },
        { image: '/product-prata-cordao.png', title: 'Colar de prata 925' },
    ],
    ouro: [
        { image: '/product-ouro-anel.png', title: 'Anéis de ouro 18k' },
        { image: '/product-ouro-brinco.png', title: 'Brincos de ouro 18k' },
        { image: '/product-ouro-pulseira.png', title: 'Pulseiras de ouro 18k' },
        { image: '/product-ouro-cordao.png', title: 'Colar de ouro 18k' },
    ],
} as const

const watermarkSrc = '/logo-recompre-joias-cinza.svg'

const ProductsContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    max-width: 1600px;
    padding: 96px 48px;

    @media (max-width: 768px) {
        gap: 28px;
        padding: 48px 24px 48px;
    }

    .products__content {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        gap: 24px;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
        }
    }

    .products__content-title {
        margin: 0;
        max-width: 720px;
        text-align: center;
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

    .products__content-select {
        display: inline-flex;
        align-items: center;
        padding: 4px;
        border: 1px solid rgba(5, 5, 5, 0.12);
        border-radius: 999px;
        gap: 4px;
    }

    .products__content-select-button {
        min-width: 104px;
        padding: 12px 20px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: rgba(5, 5, 5, 0.6);
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;

        &:hover {
            transform: translateY(-1px);
            color: var(--color-black);
        }

        &.is-active {
            background: var(--color-black);
            color: var(--color-white);
        }
    }

    .products__carousel {
        width: 100%;
        max-width: 1600px;
        position: relative;
    }

    .products__list {
        width: 100%;
    }

    .products__slide {
        height: auto;
    }

    .products__mobile-nav {
        display: none;

        @media (max-width: 768px) {
            display: contents;
        }
    }

    .products__mobile-nav-button {
        position: absolute;
        top: 40%;
        transform: translateY(-50%);
        z-index: 2;
        width: 52px;
        height: 52px;
        border: 1px solid rgba(5, 5, 5, 0.2);
        color: var(--color-black);
        background-color: #ffffff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &.is-prev {
            left: -22px;

            @media (max-width: 768px) {
                left: 8px;
            }
        }

        &.is-next {
            right: -22px;

            @media (max-width: 768px) {
                right: 8px;
            }
        }
    }

    .swiper {
        overflow: visible;
    }

    @media (max-width: 768px) {
        .swiper {
            overflow: hidden;
        }
    }
`

export function Products() {
    const [activeGroup, setActiveGroup] = useState<keyof typeof productGroups>('prata')
    const swiperRef = useRef<SwiperType | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const products = productGroups[activeGroup]

    useSectionReveal(sectionRef)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) {
            return
        }

        const cards = section.querySelectorAll('.products__slide .product-card')

        const context = gsap.context(() => {
            gsap.fromTo(
                cards,
                { autoAlpha: 0, y: 24, scale: 0.98 },
                {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.55,
                    ease: 'power3.out',
                    stagger: 0.06,
                    overwrite: 'auto',
                },
            )
        }, section)

        return () => {
            context.revert()
        }
    }, [activeGroup])

    return <ProductsContainer id='colecoes' ref={sectionRef}>
        <div className='products__content'>
            <h1 className='products__content-title' data-animate='fade-up'>
                Explore todos os <strong>tipos</strong> de produtos que vendemos
            </h1>
            <div className='products__content-select' data-animate='soft'>
                <button
                    className={`products__content-select-button ${activeGroup === 'prata' ? 'is-active' : ''}`}
                    onClick={() => setActiveGroup('prata')}
                    type='button'
                >
                    Prata
                </button>
                <button
                    className={`products__content-select-button ${activeGroup === 'ouro' ? 'is-active' : ''}`}
                    onClick={() => setActiveGroup('ouro')}
                    type='button'
                >
                    Ouro
                </button>
            </div>
        </div>
        <div className='products__carousel'>
            <div className='products__mobile-nav'>
                <button
                    aria-label='Ver produto anterior'
                    className='products__mobile-nav-button is-prev'
                    onClick={() => swiperRef.current?.slidePrev()}
                    type='button'
                >
                    <ArrowLeft size={24} weight='light' />
                </button>
                <button
                    aria-label='Ver próximo produto'
                    className='products__mobile-nav-button is-next'
                    onClick={() => swiperRef.current?.slideNext()}
                    type='button'
                >
                    <ArrowRight size={24} weight='light' />
                </button>
            </div>
            <div className='products__list'>
                <Swiper
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 16 },
                        769: { slidesPerView: 4, spaceBetween: 16 },
                    }}
                    key={activeGroup}
                    onSwiper={(instance) => {
                        swiperRef.current = instance
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide className='products__slide' key={product.title}>
                            <ProductCard
                                image={product.image}
                                title={product.title}
                                watermark={watermarkSrc}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>

    </ProductsContainer>
}
