import styled, { keyframes } from "styled-components";

const progressAnimation = keyframes`
    from {
        width: 100%;
    }
    to {
        width: 0;
    }
`;

export const AlertContainer = styled.div<{ type: string }>`
  background-color: #f0faff;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  color: #0075ad;
  overflow: hidden;
  position: relative;
`;

export const CloseButton = styled.button<{ type: string }>`
  color: #121217;
  margin-left: auto;
  border: none;
  padding: 0.25rem;
  opacity: 0.5;

  &:hover {
    opacity: 0.75;
  }

  &:focus {
    opacity: 1;
    outline: none;
  }
`;

export const IconButton = styled.span`
  width: 1rem;
  pointer-events: none;
  user-select: none;
  opacity: 0.25;
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.25rem;
  background-color: rgba(0, 0, 0, 0.1);
  animation: ${progressAnimation} 5s linear forwards;
`;
