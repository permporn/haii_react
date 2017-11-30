export const LOGIN = 'LOGIN';

export function login(data) {
    return {
        type : LOGIN,
        url: 'login',
        data,
        method: 'POST',
        isSpecial: true 
    }
}