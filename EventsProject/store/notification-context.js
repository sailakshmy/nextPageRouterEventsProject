import { createContext, useState } from "react";

export const NotificationContext = createContext({
  notification: null,
  showNotification: ({ title, message, status }) => {}, // Function to show a notification
  hideNotification: () => {}, // Function to hide a notification
});

const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState();
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
