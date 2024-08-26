"use client";

import { TextIconWithDropdownProps } from "@/components/types/generic/Interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import {
  ChevronContainer,
  ChevronIcon,
  Container,
  IconContainer,
  IconWrapper,
  Subtitle,
  Text,
  TextContainer,
} from "../../styles/styled-components/TextIconWithDropdown.styles";

const TextIconWithDropdown: React.FC<TextIconWithDropdownProps> = ({
  icon,
  text,
  subtitle,
  options,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Container>
          <IconContainer>
            <IconWrapper>{icon}</IconWrapper>
          </IconContainer>
          <TextContainer>
            <Subtitle>{subtitle}</Subtitle>
            <Text>{text}</Text>
          </TextContainer>
          <ChevronContainer>
            <ChevronIcon />
          </ChevronContainer>
        </Container>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.label && (
          <DropdownMenuLabel>{options.label}</DropdownMenuLabel>
        )}
        {options.label && <DropdownMenuSeparator />}
        {options.items.map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

TextIconWithDropdown.defaultProps = {
  options: {
    label: "",
    items: [],
  },
};

export default TextIconWithDropdown;
