import { Bounce, toast, ToastPosition } from "react-toastify";

type Type = 
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'default'

interface Props {
    text: string
    type?: Type
}

export const alertEmmiter = ({
    text,
    type = 'default'
}: Props) => {
    const options = {
        position: "top-right" as ToastPosition,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    }

    switch (type) {
        case 'info':
            return toast.info(text, options)
        case 'success':
            return toast.success(text, options)
        case 'warning':
            return toast.warning(text, options)
        case 'error':
            return toast.error(text, options)
        default:
            return toast(text, options)
    }
}