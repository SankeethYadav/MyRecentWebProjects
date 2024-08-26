export interface ButtonProps {
    label: string;
    handler: () => void;
}
  
export interface SubHeaderProps {
    title: string;
    backButtonHandler: () => void;
    buttons?: ButtonProps[];
}

