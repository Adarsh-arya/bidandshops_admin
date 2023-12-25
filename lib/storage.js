import { reactLocalStorage } from 'reactjs-localstorage';

export const setStorage = (key, data) => {
    return reactLocalStorage.set(key, data);
}

export const getStorage = (key) => {
    return reactLocalStorage.get(key);
}


export const clearStorage = (key) => {
    return reactLocalStorage.clear();
}