import { createContext, useState, useEffect } from 'react';


const NotificationContext = createContext({
  notification: null,  // { title, message, status }
  showNotification: function(notificationData) {},
  hideNotification: function() {},
});


export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();


  useEffect(() => {
    // if we don't make it inside the "if" check, then useEffect will do nothing
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      // if useEffect re-runs before the timer went off
      // so that we don't have multiple on-going timers at the same time
      // CLEAN UP FUNCTION
      return () => {
        clearTimeout(timer);  
      };
    }
  }, [activeNotification]);


  function showNotificationHandler(notificationData) {
    // setActiveNotification({
    //   title: notificationData.title,
    //   message: notificationData.message,
    //   status: notificationData.status
    // });
    setActiveNotification(notificationData);
  };


  function hideNotificationHandler() {
    setActiveNotification(null);
  };


  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  };


  return (
    <NotificationContext.Provider value={context} >
      {props.children}
    </NotificationContext.Provider>
  );
}


export default NotificationContext;