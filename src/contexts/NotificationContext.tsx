import React, { createContext, useContext, useState } from "react";

type NotificationType = "success" | "error" | "info";

type Notification = {
  message: string;
  type: NotificationType;
};

type NotificationContextType = {
  notification: Notification | null;
  showNotification: (message: string, type: NotificationType) => void;
  clearNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const clearNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, clearNotification }}
    >
      {children}
      {notification && (
        <div className="fixed top-2 w-full flex justify-center">
          <div
            className={`py-2 px-4 rounded-lg shadow-lg  ${
              notification.type === "success"
                ? "bg-white border-2 border-green-800 text-green-800"
                : notification.type === "error"
                ? "bg-white  border-2 border-red-800 text-red-800"
                : "bg-white border-2 border-black text-black"
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
