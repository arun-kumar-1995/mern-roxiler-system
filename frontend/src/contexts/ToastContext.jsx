import React, { createContext, Fragment, useContext, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
// create context
const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const contextValue = useMemo(() => {
    return {
      onError: (errMessage) => toast.error(errMessage),
      onSuccess: (message) => toast.success(message),
    };
  }, []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export default ToastProvider;
