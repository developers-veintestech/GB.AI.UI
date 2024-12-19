import React, { forwardRef, useImperativeHandle, useRef } from "react";
import NotificationAlert from "react-notification-alert";

const NotificationService = forwardRef((props, ref) => {
  const notificationAlertRef = useRef(null);

  useImperativeHandle(ref, () => ({
    notify: (message, type) => {
      const options = {
        place: "tr",
        message: <div>{message}</div>,
        type: type,
        autoDismiss: 7,
      };
      notificationAlertRef.current.notificationAlert(options);
    },
  }));

  return <NotificationAlert ref={notificationAlertRef} />;
});

export default NotificationService;
