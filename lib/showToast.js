import { toast } from 'react-toastify';

export function showAsyncToast(loadingTitle = "Please wait...") {
    toast.dismiss();
    const id = toast.loading(loadingTitle);
    return id;
}

export function showAsyncToastError(id, errorText) {

    toast.update(id, { render: errorText, type: "error", isLoading: false, autoClose: 3000 });
}
export function showAsyncToastSuccess(id, successText) {

    toast.update(id, { render: successText, type: "success", isLoading: false, autoClose: 3000 });
}

export default (message) => {
    toast.dismiss();
    toast(message);
}

export const successToast = (message) => {
    toast.dismiss();
    toast.success(message);
}

export const errorToast = (message) => {
    toast.dismiss();
    toast.error(message);
}

export const infoToast = (message) => {
    toast.dismiss();
    toast.info(message);
}


export const warnToast = (message) => {
    toast.dismiss();
    toast.warning(message);
}