import React, { createContext, useContext} from "react";
import toast, { Toaster } from "react-hot-toast";
// create context
const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const onError = (errMessage) => toast.error(errMessage);
  const onSuccess = (message) => toast.success(message);
  return (
    <ToastContext.Provider value={{ onError, onSuccess }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export default ToastProvider;
