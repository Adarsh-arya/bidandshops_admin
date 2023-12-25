import { clearStorage, getStorage } from './storage';

export default () => {
    const auth = getStorage('auth');
    if (!auth || auth == undefined || auth.length == 0) {
        return false;
    } else {
        return true;
    }
}

export const logout = () => {
    clearStorage();
}