import React from "react";
import {
  IconWrapper,
  MenuItemContainer,
  MenuLink,
  TextWrapper,
} from "../../styles/styled-components/MenuItem.styles";

import { MenuItemProps } from "@/components/types/generic/Interfaces";

const MenuItem: React.FC<MenuItemProps> = ({
  text,
  href,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <MenuItemContainer isActive={isActive} onClick={onClick}>
      <MenuLink href={href}>
        <IconWrapper isActive={isActive}>{icon}</IconWrapper>
        <TextWrapper isActive={isActive}>
          <span>{text}</span>
        </TextWrapper>
      </MenuLink>
    </MenuItemContainer>
  );
};

export default MenuItem;
