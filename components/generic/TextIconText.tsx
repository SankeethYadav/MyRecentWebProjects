"use client";

import { FC } from "react";
import {
  Container,
  CustomLink,
  LinkContainer,
  Subtitle,
  Text,
  TextContainer,
} from "../../styles/styled-components/TextIconText.styles";

import { TextIconTextProps } from "@/components/types/generic/Interfaces";

const TextIconText: FC<TextIconTextProps> = ({
  text,
  subtitle,
  href,
  icon,
  nameStyle,
  subtitleStyle,
}) => {
  return (
    <Container>
      <LinkContainer>
        <CustomLink href={href}>
          {icon}
          <TextContainer>
            <Text style={nameStyle}>{text}</Text>
            <Subtitle style={subtitleStyle}>{subtitle}</Subtitle>
          </TextContainer>
        </CustomLink>
      </LinkContainer>
    </Container>
  );
};

export default TextIconText;
