'use client'

import styled from '@emotion/styled'

type ButtonVariant = 'white' | 'black' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    children: React.ReactNode
}

const StyledButton = styled.button<{ variant: ButtonVariant }>`
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 500;
    padding: 0.875rem 2rem;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, color 0.25s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transform: translateY(0);

    ${({ variant }) =>
        variant === 'white' &&
        `
        background: var(--color-white);
        color: var(--color-black);
        box-shadow: 0 10px 30px rgba(5, 5, 5, 0.08);
    `}

    ${({ variant }) =>
        variant === 'black' &&
        `
        background: var(--color-black);
        color: var(--color-white);
        box-shadow: 0 12px 30px rgba(5, 5, 5, 0.14);
    `}

    ${({ variant }) =>
        variant === 'ghost' &&
        `
        background: transparent;
        color: inherit;
        border: none;
        padding-left: 0;
        padding-right: 0;
    `}

    &:hover {
        opacity: 0.92;
        transform: translateY(-2px);
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none;
    }
`

export function Button({ variant = 'white', children, ...props }: ButtonProps) {
    return (
        <StyledButton variant={variant} {...props}>
            {children}
        </StyledButton>
    )
}
