import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';


export const Container = styled.div`
    width: 8.5rem;
    self-stretch: 100%;
    padding-left: 2rem;
    padding-top: 0.063rem;
    padding-bottom: 0.063rem;
    display: flex;
    justify-content: start;
    justify-items: space-between;
    align-items: center;
    cursor: pointer;
    margin-left: auto;
`;

export const IconContainer = styled.div`
    padding-left: 0.5rem;
    display: flex;
    justify-content: start;
    align-items: start;
    cursor: pointer;
`;

export const IconWrapper = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
`;

export const TextContainer = styled.div`
    padding-left: 0.125rem;
    padding-right: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    white-space: nowrap;
    cursor: pointer;
`;

export const Subtitle = styled.span`
    color: #000;
    font-size: 0.8rem;
    font-family: 'Manrope', sans-serif;
    font-weight: normal;
`;

export const Text = styled.span`
    color: #1E90FF;
    font-size: 0.9rem;
    font-family: 'Manrope', sans-serif;
    font-weight: normal;
`;

export const ChevronContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
`;

export const ChevronIcon = styled(ChevronDown)`
    width: 1rem;
    height: 1rem;
    position: relative;
`;
