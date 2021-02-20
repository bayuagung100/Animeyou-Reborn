const { NODE_ENV: ENV } = process.env
const APIlocal = 'http://' + window.location.hostname + ':8080';
const API = '';

export const clientKey = "WWHXV$)~E+2u^Jt,~(kh>VcCcuJ!oT";
export const apiV1 = "/api/v1/";
export const apiV2 = "/api/v2/";

export const uAPI = ENV === 'production' ? API : APIlocal; 