'use client'

import { useMemo, useRef, useState } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Button } from '../Button'
import { openWhatsappDirectContact } from '../../lib/whatsapp'
import { useSectionReveal } from '../../lib/useSectionReveal'

type FooterModal = 'privacy' | 'terms' | null

const FooterContainer = styled.footer`
    width: 100%;
    background: var(--color-black);
    display: flex;
    justify-content: center;
    padding: 36px 48px 40px;
    position: relative;

    @media (max-width: 768px) {
        padding: 32px 24px 36px;
    }

    .footer__inner {
        width: 100%;
        max-width: 1600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        text-align: center;
    }

    .footer__logo {
        width: 52px;
        height: 52px;
        object-fit: contain;
    }

    .footer__copyright {
        margin: 0;
        color: rgba(242, 239, 233, 0.9);
        font-family: var(--font-sans);
        font-size: 18px;
        font-weight: 300;
        line-height: 1.1;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }

    .footer__legal {
        margin: 0;
        max-width: 540px;
        color: rgba(242, 239, 233, 0.24);
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 300;
        line-height: 1.1;

        @media (max-width: 768px) {
            font-size: 13px;
            max-width: 310px;
        }
    }

    .footer__link {
        border: 0;
        background: transparent;
        padding: 0;
        color: rgba(242, 239, 233, 0.68);
        font: inherit;
        cursor: pointer;
        transition: color 0.25s ease, opacity 0.25s ease;

        &:hover {
            color: var(--color-white);
            opacity: 0.9;
        }
    }

    .footer__bottom-line {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 12px;
        background: rgba(242, 239, 233, 0.08);
    }
    

    .footer__modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(5, 5, 5, 0.58);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        z-index: 20;
    }

    .footer__modal {
        width: 100%;
        max-width: 520px;
        background: var(--color-white);
        color: var(--color-black);
        border-radius: 24px;
        padding: 28px;
        display: flex;
        flex-direction: column;
        gap: 18px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);

        @media (max-width: 768px) {
            padding: 22px;
            border-radius: 20px;
        }
    }

    .footer__modal-title {
        margin: 0;
        font-family: var(--font-sans);
        font-size: 28px;
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.04em;
    }

    .footer__modal-text {
        margin: 0;
        color: rgba(5, 5, 5, 0.72);
        font-family: var(--font-sans);
        font-size: 15px;
        font-weight: 300;
        line-height: 1.35;
    }

    .footer__modal-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
    }
`

export function Footer() {
    const [activeModal, setActiveModal] = useState<FooterModal>(null)
    const footerRef = useRef<HTMLElement>(null)

    useSectionReveal(footerRef)

    const modalContent = useMemo(() => {
        if (activeModal === 'privacy') {
            return {
                title: 'Política de privacidade',
                description: 'Utilizamos os dados enviados no contato apenas para atendimento comercial e continuidade da conversa. Neste site, o dado principal gerado é o clique no botão que direciona você ao WhatsApp, ambiente em que a comunicação acontece diretamente com nossa equipe. Não compartilhamos essas informações com terceiros fora do necessário para o próprio atendimento.',
            }
        }

        if (activeModal === 'terms') {
            return {
                title: 'Termos e condições',
                description: 'Ao iniciar contato conosco pelo WhatsApp, você concorda em utilizar esse canal para solicitar informações, orçamentos e acompanhar seu atendimento. Os detalhes enviados na conversa são usados somente para responder sua solicitação, organizar o pedido e prestar suporte comercial de forma segura e objetiva.',
            }
        }

        return null
    }, [activeModal])

    return <FooterContainer id='contato' ref={footerRef}>
        <div className='footer__inner'>
            <Image
                alt='Logo Recompre Joias'
                className='footer__logo'
                data-animate='soft'
                height={52}
                src='/logo-recompre-joias-branco.svg'
                width={52}
            />
            <p className='footer__copyright' data-animate='soft'>Recompre Joias © 2026</p>
            <p className='footer__legal' data-animate='soft'>
                Todos os direitos reservados, seus dados estão protegidos, podendo conferir na{' '}
                <button className='footer__link' onClick={() => setActiveModal('privacy')} type='button'>
                    nossa política de privacidade
                </button>
                {' '}e{' '}
                <button className='footer__link' onClick={() => setActiveModal('terms')} type='button'>
                    termos e condições
                </button>
            </p>
        </div>
        <div className='footer__bottom-line' />

        {modalContent && (
            <div
                aria-modal='true'
                className='footer__modal-backdrop'
                onClick={() => setActiveModal(null)}
                role='dialog'
            >
                <div className='footer__modal' onClick={(event) => event.stopPropagation()}>
                    <h2 className='footer__modal-title'>{modalContent.title}</h2>
                    <p className='footer__modal-text'>{modalContent.description}</p>
                    <div className='footer__modal-actions'>
                        <Button onClick={openWhatsappDirectContact} type='button' variant='black'>Falar no WhatsApp</Button>
                        <Button onClick={() => setActiveModal(null)} type='button' variant='ghost'>
                            Fechar
                        </Button>
                    </div>
                </div>
            </div>
        )}
    </FooterContainer>
}
