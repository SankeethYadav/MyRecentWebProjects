import React from "react";
import {
  IconWrapper,
  Subtitle,
  TextBoxContainer,
  TextContainer,
  Title,
} from "../../styles/styled-components/TextBox.styles";

import { TextBoxProps } from "@/components/types/generic/Interfaces";

const TextBox: React.FC<TextBoxProps> = ({
  text,
  subtitle,
  icon,
  backgroundColor,
  textColor,
  children,
}) => {
  return (
    <TextBoxContainer backgroundColor={backgroundColor} textColor={textColor}>
      <IconWrapper>{icon}</IconWrapper>
      <TextContainer>
        <Title>{text}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TextContainer>
      {children}
    </TextBoxContainer>
  );
};

export default TextBox;
