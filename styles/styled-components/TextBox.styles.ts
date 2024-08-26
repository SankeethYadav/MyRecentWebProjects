import styled from 'styled-components';

export const TextBoxContainer = styled.div<{ backgroundColor: string; textColor: string }>`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 19.7px rgba(16, 24, 40, 0.05);
    border: 1px solid #e5e7eb;
    height: 120px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ textColor }) => textColor};
    width: 100%;
    height: 5.3rem;
`;

export const IconWrapper = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    gap: 0.125rem;
    color: inherit;

`;

export const Title = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: inherit;
`;

export const Subtitle = styled.div`
    color: #64748b;
    font-size: 0.875rem;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem
`;