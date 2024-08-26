import React, { useEffect, useRef, useState } from "react";
import {
  AlertContainer,
  CloseButton,
  IconButton,
  ProgressBar,
} from "../../styles/styled-components/AlertNotification.styles";

import { AlertNotificationProps } from "@/components/types/generic/Interfaces";

const AlertNotification: React.FC<AlertNotificationProps> = ({
  notifications,
}) => {
  const [activeNotifications, setActiveNotifications] = useState(notifications);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeNotifications.length === 0) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setActiveNotifications([]);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeNotifications]);

  const handleClose = (index: number) => {
    setActiveNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-3">
      {activeNotifications.map((notification, index) => (
        <AlertContainer key={index} type="info" role="alert">
          <span dangerouslySetInnerHTML={{ __html: notification.message }} />
          <CloseButton
            type="button"
            onClick={() => handleClose(index)}
            aria-label="Close"
          >
            <IconButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </IconButton>
          </CloseButton>
          <ProgressBar />
        </AlertContainer>
      ))}
    </div>
  );
};

export default AlertNotification;
