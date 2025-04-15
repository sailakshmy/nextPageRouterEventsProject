import React, { useContext } from "react";
import { NotificationContext } from "../../store/notification-context";
import Notification from "../ui/notification";
import MainHeader from "./main-header";

const Layout = (props) => {
  const notificationContext = useContext(NotificationContext);
  const activeNotification = notificationContext.notification;
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      <Notification
        title={activeNotification?.title}
        message={activeNotification?.message}
        status={activeNotification?.status}
      />
    </>
  );
};

export default Layout;
