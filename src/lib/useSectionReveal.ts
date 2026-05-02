'use client'

import { RefObject, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type AnimateKind = 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'soft'

interface UseSectionRevealOptions {
    dependencies?: ReadonlyArray<unknown>
    start?: string
}

const initialStates: Record<AnimateKind, gsap.TweenVars> = {
    'fade-up': { autoAlpha: 0, y: 36 },
    'fade-left': { autoAlpha: 0, x: -36 },
    'fade-right': { autoAlpha: 0, x: 36 },
    scale: { autoAlpha: 0, scale: 0.94 },
    soft: { autoAlpha: 0, y: 18, scale: 0.98 },
}

function getAnimationProps(kind: AnimateKind) {
    return initialStates[kind] ?? initialStates['fade-up']
}

export function useSectionReveal(rootRef: RefObject<HTMLElement | null>, options?: UseSectionRevealOptions) {
    const dependencies = options?.dependencies ?? []
    const start = options?.start ?? 'top 88%'

    useEffect(() => {
        const root = rootRef.current
        if (!root) {
            return
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduceMotion) {
            const elements = root.querySelectorAll<HTMLElement>('[data-animate]')
            gsap.set(elements, { clearProps: 'all', autoAlpha: 1 })
            return
        }

        gsap.registerPlugin(ScrollTrigger)

        const context = gsap.context(() => {
            const elements = root.querySelectorAll<HTMLElement>('[data-animate]')

            elements.forEach((element, index) => {
                const kind = (element.dataset.animate as AnimateKind | undefined) ?? 'fade-up'
                const delay = Number(element.dataset.animateDelay ?? 0)

                gsap.set(element, getAnimationProps(kind))

                gsap.to(element, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    delay,
                    duration: 0.85,
                    ease: 'power3.out',
                    overwrite: 'auto',
                    scrollTrigger: {
                        trigger: element,
                        start,
                        once: true,
                    },
                })

                if (index === elements.length - 1) {
                    ScrollTrigger.refresh()
                }
            })
        }, root)

        return () => {
            context.revert()
        }
    }, [rootRef, start, ...dependencies])
}