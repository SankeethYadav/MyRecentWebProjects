import React from "react";
import { StyledCard, Title } from "../../styles/styled-components/Card.styles";

import { CustomCardProps } from "@/components/types/generic/Interfaces";

const CustomCard: React.FC<CustomCardProps> = ({
  text,
  subtitle,
  width,
  height,
  children,
}) => {
  return (
    <StyledCard width={width || "100px"} height={height || "100px"}>
      <Title>{text}</Title>
      <span>{subtitle}</span>
      <div>{children}</div>
    </StyledCard>
  );
};

export default CustomCard;
