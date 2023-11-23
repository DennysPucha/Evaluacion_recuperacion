'use client';

export const get = (key) => {
    window.sessionStorage.getItem(key);
}

export const getToken = () => {
    return window.sessionStorage.getItem("token");
}

export const borrarSesion = () => {
    window.sessionStorage.clear();
}

export const estaSesion = () => {
    let token = window.sessionStorage.getItem('token');
    return (token && (token != 'undefined' || token != null || token != 'null'));
}