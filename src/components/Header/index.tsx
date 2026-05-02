'use client'

import styled from '@emotion/styled'
import gsap from 'gsap'
import Image from 'next/image'
import { ArrowUpRight } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { openWhatsappDirectContact, openWhatsappGroup } from '../../lib/whatsapp'

const navigationItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Para voce', href: '#para-voce' },
    { label: 'Personalizacao', href: '#personalizacao' },
    { label: 'Colecoes', href: '#colecoes' },
    { label: 'Proposito', href: '#proposito' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Contato', href: '#contato' },
] as const

const HeaderBar = styled.header<{ isOpen: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 20px 40px;
    color: var(--color-white);
    border-bottom: 1px solid rgba(242, 239, 233, 0.16);
    background: ${({ isOpen }) => (isOpen ? 'var(--color-black)' : 'transparent')};
    transition: background 0.35s ease, border-color 0.35s ease;

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        padding: 20px 24px;
    }

    .header__menu-button,
    .header__contact-button,
    .header__logo-button {
        border: 0;
        background: transparent;
        color: inherit;
        padding: 0;
        cursor: pointer;
    }

    .header__menu-button {
        justify-self: start;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 300;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        transition: opacity 0.25s ease;

        &:hover {
            opacity: 0.76;
        }
    }

    .header__menu-icon {
        position: relative;
        width: 18px;
        height: 12px;
        display: inline-block;

        span {
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            background: currentColor;
            transform-origin: center;
            transition: transform 0.28s ease, opacity 0.2s ease, top 0.28s ease;
        }

        span:nth-of-type(1) {
            top: 1px;
        }

        span:nth-of-type(2) {
            top: 50%;
            transform: translateY(-50%);
        }

        span:nth-of-type(3) {
            top: calc(100% - 1px);
        }
    }

    .header__menu-button[aria-expanded='true'] .header__menu-icon span:nth-of-type(1) {
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
    }

    .header__menu-button[aria-expanded='true'] .header__menu-icon span:nth-of-type(2) {
        opacity: 0;
    }

    .header__menu-button[aria-expanded='true'] .header__menu-icon span:nth-of-type(3) {
        top: 50%;
        transform: translateY(-50%) rotate(-45deg);
    }

    .header__logo-button {
        justify-self: center;
        width: 54px;
        height: 54px;
        position: relative;

        @media (max-width: 768px) {
            justify-self: end;
            width: 50px;
            height: 50px;
        }
    }

    .header__logo-image {
        object-fit: contain;
    }

    .header__contact-button {
        justify-self: end;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 300;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        transition: opacity 0.2s ease, transform 0.2s ease;

        &:hover {
            opacity: 0.82;
            transform: translateY(-1px);
        }

        @media (max-width: 768px) {
            display: none;
        }
    }
`

const MenuOverlay = styled.aside`
    position: fixed;
    inset: 0;
    z-index: 20;
    background: var(--color-black);
    color: var(--color-white);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: var(--header-height, 84px);
    clip-path: inset(0 0 100% 0);
    pointer-events: none;

    .header-menu__nav {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 48px 24px;

        @media (max-width: 768px) {
            justify-content: flex-start;
            align-items: flex-start;
            padding: 40px 24px 24px;
        }
    }

    .header-menu__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;

        @media (max-width: 768px) {
            align-items: flex-start;
            gap: 14px;
        }
    }

    .header-menu__item {
        opacity: 0;
        transform: translateY(32px);
    }

    .header-menu__link {
        border: 0;
        background: transparent;
        color: inherit;
        padding: 0;
        cursor: pointer;
        font-family: var(--font-sans);
        font-size: 58px;
        font-weight: 300;
        line-height: 0.96;
        letter-spacing: -0.04em;
        text-align: center;
        transition: opacity 0.25s ease, transform 0.25s ease;

        &:hover {
            opacity: 0.7;
            transform: translateY(-2px);
        }

        @media (max-width: 768px) {
            font-size: 42px;
            text-align: left;
        }
    }

    .header-menu__footer {
        width: 100%;
        border-top: 1px solid rgba(242, 239, 233, 0.16);
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 24px;
        padding: 32px 40px;
        opacity: 0;
        transform: translateY(20px);

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
        }
    }

    .header-menu__meta {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        max-width: 420px;
    }

    .header-menu__meta-text,
    .header-menu__copyright {
        margin: 0;
        font-family: var(--font-sans);
        font-size: 16px;
        font-weight: 300;
        line-height: 1.2;
        letter-spacing: -0.03em;
        color: rgba(242, 239, 233, 0.82);

        @media (max-width: 768px) {
            font-size: 14px;
        }
    }

    .header-menu__footer-button {
        border: 0;
        border-bottom: 1px solid rgba(242, 239, 233, 0.88);
        background: transparent;
        color: var(--color-white);
        padding: 0 0 6px;
        cursor: pointer;
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        transition: opacity 0.25s ease, transform 0.25s ease;

        &:hover {
            opacity: 0.8;
            transform: translateY(-1px);
        }
    }
`

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const headerRef = useRef<HTMLElement>(null)
    const overlayRef = useRef<HTMLElement>(null)
    const footerRef = useRef<HTMLDivElement>(null)
    const navRefs = useRef<Array<HTMLLIElement | null>>([])
    const pendingHrefRef = useRef<string | null>(null)
    const isAnimatingRef = useRef(false)

    const updateHeaderHeight = () => {
        if (!headerRef.current) {
            return
        }

        document.documentElement.style.setProperty('--header-height', `${headerRef.current.offsetHeight}px`)
    }

    const closeMenuImmediately = () => {
        if (!overlayRef.current) {
            return
        }

        gsap.set(overlayRef.current, { clipPath: 'inset(0 0 100% 0)', pointerEvents: 'none' })
        gsap.set(navRefs.current.filter(Boolean), { opacity: 0, y: 32 })
        gsap.set(footerRef.current, { opacity: 0, y: 20 })
    }

    const openMenu = () => {
        if (!overlayRef.current || isAnimatingRef.current) {
            return
        }

        isAnimatingRef.current = true
        setIsOpen(true)

        const items = navRefs.current.filter(Boolean)

        gsap.set(overlayRef.current, { pointerEvents: 'auto' })
        gsap.timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => {
                isAnimatingRef.current = false
            },
        })
            .to(overlayRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.58 })
            .to(items, { opacity: 1, y: 0, duration: 0.48, stagger: 0.06, ease: 'power3.out' }, 0.18)
            .to(footerRef.current, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' }, 0.36)
    }

    const closeMenu = () => {
        if (!overlayRef.current || isAnimatingRef.current) {
            return
        }

        isAnimatingRef.current = true
        const items = [...navRefs.current.filter(Boolean)].reverse()

        gsap.timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => {
                setIsOpen(false)
                gsap.set(overlayRef.current, { pointerEvents: 'none' })
                gsap.set(navRefs.current.filter(Boolean), { opacity: 0, y: 32 })
                gsap.set(footerRef.current, { opacity: 0, y: 20 })
                isAnimatingRef.current = false

                const pendingHref = pendingHrefRef.current
                if (pendingHref) {
                    pendingHrefRef.current = null
                    requestAnimationFrame(() => {
                        const target = document.querySelector<HTMLElement>(pendingHref)
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            window.history.replaceState(null, '', pendingHref)
                        }
                    })
                }
            },
        })
            .to(items, { opacity: 0, y: -20, duration: 0.24, stagger: 0.03, ease: 'power3.in' })
            .to(footerRef.current, { opacity: 0, y: -12, duration: 0.22, ease: 'power3.in' }, 0)
            .to(overlayRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.48 }, 0.1)
    }

    const handleToggleMenu = () => {
        if (isOpen) {
            closeMenu()
            return
        }

        openMenu()
    }

    const handleNavigate = (href: string) => {
        if (isAnimatingRef.current) {
            return
        }

        if (isOpen) {
            pendingHrefRef.current = href
            closeMenu()
            return
        }

        const target = document.querySelector<HTMLElement>(href)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            window.history.replaceState(null, '', href)
        }
    }

    useEffect(() => {
        updateHeaderHeight()
        closeMenuImmediately()

        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current,
                { autoAlpha: 0, y: -18 },
                { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 },
            )
        }

        const onResize = () => updateHeaderHeight()
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <>
            <HeaderBar isOpen={isOpen} ref={headerRef}>
                <button
                    aria-expanded={isOpen}
                    aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                    className='header__menu-button'
                    onClick={handleToggleMenu}
                    type='button'
                >
                    <span className='header__menu-icon' aria-hidden='true'>
                        <span />
                        <span />
                        <span />
                    </span>
                    <span>{isOpen ? 'Fechar' : 'Menu'}</span>
                </button>

                <button className='header__logo-button' onClick={() => handleNavigate('#inicio')} type='button'>
                    <Image
                        alt='Logo Recompre Joias'
                        className='header__logo-image'
                        fill
                        priority
                        sizes='54px'
                        src='/logo-recompre-joias-branco.svg'
                    />
                </button>

                <button className='header__contact-button' onClick={openWhatsappGroup} type='button'>
                    <span>Comprar joias</span>
                    <ArrowUpRight size={14} weight='regular' />
                </button>
            </HeaderBar>

            <MenuOverlay ref={overlayRef}>
                <nav className='header-menu__nav' aria-label='Menu principal'>
                    <ul className='header-menu__list'>
                        {navigationItems.map((item, index) => (
                            <li
                                className='header-menu__item'
                                key={item.href}
                                ref={(element) => {
                                    navRefs.current[index] = element
                                }}
                            >
                                <button className='header-menu__link' onClick={() => handleNavigate(item.href)} type='button'>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className='header-menu__footer' ref={footerRef}>
                    <div className='header-menu__meta'>
                        <p className='header-menu__meta-text'>Recompre Joias com curadoria de ouro 18k e prata 925, com atendimento direto e seleção acessível.</p>
                        <button className='header-menu__footer-button' onClick={openWhatsappDirectContact} type='button'>
                            Entrar em contato
                        </button>
                    </div>
                    <p className='header-menu__copyright'>© 2026 Recompre Joias. Todos os direitos reservados.</p>
                </div>
            </MenuOverlay>
        </>
    )
}
