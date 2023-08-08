import { postApi, putApi } from "./genericAPI";

export const isLoggedIn = () => {
    return localStorage.getItem('accessToken') !== null
}


const BASE_URL = 'http://localhost:8000/';

export const merchantLogin = async (data: any) => {
    const url = BASE_URL + "auth/login";
    return postApi(url, data);
}

export const merchantRegister = async (data: any) => {
    const url = BASE_URL + "auth/register";
    return postApi(url, data);
}

export const updateMerchantConfiguration = async (data: any) => {
    const merchantID = localStorage.getItem('merchantId');
    const accessToken = localStorage.getItem('accessToken');
    const url = BASE_URL + `merchants/${merchantID}`
    return putApi(url, data, accessToken);
}