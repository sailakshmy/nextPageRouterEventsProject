import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext({
  notification: null,
  showNotification: ({ title, message, status }) => {}, // Function to show a notification
  hideNotification: () => {}, // Function to hide a notification
});

const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (activeNotification) {
      if (
        activeNotification.status === "success" ||
        activeNotification.status === "error"
      ) {
        // Logic to handle success notification
        const timer = setTimeout(() => {
          setActiveNotification(null); // Clear notification after 3 seconds
        }, 3000);
        return () => clearTimeout(timer); // Cleanup function to clear the timer
      }
    }
  }, [activeNotification]);
  const showNotificationHandler = (notificationData) => {
    // Logic to show a notification
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    // Logic to hide a notification
    setActiveNotification(null);
  };

  const value = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
