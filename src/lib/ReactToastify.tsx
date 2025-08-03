import {toast, ToastOptions} from "react-toastify";

const customToastOption = {
  style: {
    width: "400px",
    right: "80px",
    zIndex: 300000,
    bottom: "10px",
    fontFamily: "open sans",
    color: "#1E1850",
  },
};
export const showSuccess = (
  message: string,
  ToastOptions: ToastOptions = customToastOption
) =>
  toast.success(
    <div data-cy="success-toast">
      <p>{message}</p>
    </div>,
    ToastOptions
  );
export const showError = (
  message: string,
  ToastOptions: ToastOptions = customToastOption
) => {
  toast.error(
    <div>
      <p>{message}</p>
    </div>,
    ToastOptions
  );
};

export const showInfo = (
  message: string,
  ToastOptions: ToastOptions = customToastOption
) => {
  toast.info(
    <div>
      <p>{message}</p>
    </div>,
    ToastOptions
  );
};

export const showPromis = (
  functionPromise: any,
  ToastOptions: ToastOptions = customToastOption
) => {
  toast.promise(
    functionPromise,
    {
      pending: "Opening Chat, Please Wait",
      success: "Chat Opened Successfully 👌",
    },
    ToastOptions
  );
};
