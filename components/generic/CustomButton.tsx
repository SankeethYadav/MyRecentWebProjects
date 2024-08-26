import React from 'react';
import { CustomButtonProps } from '@/components/types/generic/Interfaces';


const CustomButton: React.FC<CustomButtonProps> = ({ text, icon, icon1, iconColor = 'inherit', textColor = 'inherit'}) => {
    return (
      <span className="flex items-center text-sm">
        <span className="flex-shrink-0 mr-2" style={{ color: iconColor }}>
          {icon}
        </span>
        <span style={{ color: textColor }}>{text}</span>
        <span className="flex-shrink-0 ml-2" style={{ color: iconColor }}>
          {icon1}
        </span>
      </span>
    );
};

export default CustomButton;