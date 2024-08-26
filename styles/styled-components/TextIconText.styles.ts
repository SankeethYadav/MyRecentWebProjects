import styled from 'styled-components';
import Link from 'next/link';

export const Container = styled.div`
    display: flex;
    justify-items: center;
    padding: 2rem;
    white-space: nowrap;
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
`;

export const CustomLink = styled(Link)`
    display: flex;
    align-items: center;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 0.5rem;
`;

export const Text = styled.span<{ style?: React.CSSProperties }>`
    ${({ style }) => style && { ...style }};
`;

export const Subtitle = styled.span<{ style?: React.CSSProperties }>`
    ${({ style }) => style && { ...style }};
`;
