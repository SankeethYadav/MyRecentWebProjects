export interface CustomButtonProps {
  text: string;
  icon?: React.ReactNode;
  icon1?: React.ReactNode;
  iconColor?: string;
  textColor?: string;
}
export interface Notification {
  message: string;
}

export interface CustomCardProps {
  text: string;
  subtitle?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

export interface MenuItemProps {
  text: string;
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export interface TextBoxProps {
  text: string;
  subtitle: string;
  icon: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  children?: React.ReactNode;
}

export interface TextIconTextProps {
  text: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  nameStyle?: React.CSSProperties;
  subtitleStyle?: React.CSSProperties;
}

export interface AlertNotificationProps {
  notifications: Notification[];
}

export type OptionItem = {
  label: string;
  onClick: () => void;
};

export type Options = {
  label?: string;
  items: OptionItem[];
};

export type TextIconWithDropdownProps = {
  icon: React.ReactNode;
  text: string;
  subtitle: string;
  options: Options;
};
