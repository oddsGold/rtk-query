import {toast} from "react-toastify";

const errorHandler = (error) => toast.error(
    error
        ? (error.trim() || 'Щось пішло не так. Повторіть спробу пізніше')
        : 'Щось пішло не так. Повторіть спробу пізніше',
    {position: "bottom-left"}
);

const acceptHandler = (msg) => toast.success(
    msg
        ? (msg.trim() || 'Запись успешно создана')
        : 'Запись успешно создана',
    {position: "bottom-left"}
);

export { errorHandler, acceptHandler };
