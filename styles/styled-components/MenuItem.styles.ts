import styled from "styled-components";
import Link from "next/link";

interface ActiveProps {
    isActive: boolean;
}

export const IconWrapper = styled.div<ActiveProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    transition: color 0.3s;
    color: ${({ isActive }) => (isActive ? "#064CFE" : "#121217")};
`;

export const TextWrapper = styled.div<ActiveProps>`
    padding-left: 0.5rem;
    display: flex;
    align-items: center;

    span {
        color: ${({ isActive }) => (isActive ? "#064CFE" : "#121217")};
        font-size: 1rem;
        font-family: "Manrope", sans-serif;
        white-space: nowrap;
        line-height: 1.5rem;
        text-align: left;
        transition: color 0.3s;
    }
`;

export const Badge = styled.span`
    background-color: #007bff;
    color: #fff;
    border-radius: 50%;
    padding: 0.125rem 0.5rem;
    margin-left: 0.5rem;
    font-size: 0.75rem;
`;

export const MenuItemContainer = styled.div<ActiveProps>`
    display: flex;
    padding: 0.625rem 1.25rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    gap: 0.625rem;
    border-radius: 0.5rem;
    color: inherit;
    transition: color 0.3s;
    cursor: pointer;
    position: relative;
    

    &:hover ${IconWrapper}, &:hover ${TextWrapper} span {
        color: #064CFE;
    }

    &::after {
        content: "";
        height: 0.25rem;
        width: 0;
        background-color: #064CFE;
        display: block;
        position: absolute;
        left: 0;
        bottom: -0.25rem;
        transition: width 0.3s;
    }

    &:hover::after,
    ${({ isActive }) =>
        isActive &&
        `
        &::after {
            width: 100%;
        }
    `}
`;

export const MenuLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;

    &:hover {
        color: #064cfe;

        &::after {
        opacity: 1;
        }
    }

    &:focus {
        color: #064cfe;

        &::after {
        opacity: 1;
        }
    }

    &::after {
        content: "";
        height: 0.25rem;
        width: 100%;
        background-color: #064cfe;
        display: block;
        position: absolute;
        left: 0;
        bottom: -0.25rem;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    }
`;
