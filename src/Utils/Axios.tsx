import axios from "axios";

const instance = axios.create();

axios.defaults.headers.common['Username'] = 'APP';
axios.defaults.timeout = 5000;

import {Error} from "../Utils/Error";
import {getData} from "./Storage";

axios.interceptors.response.use(response => {
    return response.data
    console.log("default", response);
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(
    res => {
        console.log("default", res);
        const status = Number(res.status) || 200;
        const message = res.statusText + "( " + res.status + ")";
        if (status === 401) {
            console.log("error")
            return;
        }
        if (status === 400 || status === 500) {
            console.log("Dinh dang sai")
            return Promise.reject(new Error(message));
        }
        if (status !== 200 || res.data.code === 1) {
            console.log(message);
            return Promise.reject(new Error(message));
        }

        return res;
    },
    error => {
        // @ts-ignore
        return Promise.reject(new Error(error));
    }
);

export const axiosGet = (url: string, object: any) => {
    const params = new URLSearchParams(object).toString();
    const urlfull = `${url}?${params}`;
    console.log(urlfull);
    return axios.get(urlfull, {
        "headers": {
            "Username": "APP"
        },
    });
}

export const axiosPost = async (url: string, object: any) => {
    let user = await getData('userLogin');
    const params = new URLSearchParams(object).toString();
    const urlfull = `${url}?${params}`;
    console.log(urlfull);
    return axios.post(urlfull, {
        "headers": {
            "content-type": "application/json",
            "Username": user
        },
    });
}

export const axiosPostV1 = async (url: string, data: any) => {
    let user = await getData('userLogin');
    console.log(data);
    const headers = {
        "content-type": "application/json",
        "Username": user
    }
    return axios.post(url, data, {headers});
}

export const axiosPost1 = async (url: string, object: any) => {
    const params = new URLSearchParams(object).toString();
    const urlfull = `${url}?${params}`;
    console.log(urlfull);
    return axios.post(url, JSON.stringify(object), {
        "headers": {
            "content-type": "application/json",
        },
    });
}

export function axiosPutEx(url: string, params: any) {
    return axios({
        url: url,
        method: "put",
        params
    });
}

export const axiosPut = async (url: string, object: any) => {
    let user = await getData('userLogin');
    let obj = JSON.stringify(object);
    console.log(url, obj)
    return axios.put(url, obj, {
        "headers": {
            "content-type": "application/json",
            "Username": user
        },
    });
}


export const yourErrorHandler = (error: any) => {
    if (error.response) {
        // Request made and server responded
        console.log("loi response")
        console.log(error.response);
        console.log(error.response._response);
        console.log(error.response.headers);
        //   return error.response._response;
    } else if (error.request) {
        console.log(" loi request")
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("loi other")
        console.log('Error', error.message);
    }
    let err = Error["401"];
    err.massage = (error.response) ? error.response._response : (error.request) ? error.request._response : error.message;
    return err;
}

export const errorCode = (val: string) => {
    if (val != null) {
        if (val.indexOf("Failed to connect to") != -1) {
            console.log("Không có kết nối!");
            return "Không có kết nối! mã lỗi: 404" +
                "\n Kiểm tra kết nối internet"
        } else {
            return val
        }
    } else {
        return "Lỗi không xác định, mã lỗi 505"
    }

}
