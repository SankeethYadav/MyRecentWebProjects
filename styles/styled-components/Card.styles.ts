import styled from "styled-components";

export const StyledCard = styled.div<{ width: string; height: string }>`
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  border: 0.0625rem solid #d2d6dc;
  padding: 1rem;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const Title = styled.div`
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
