import axios from 'axios'

export const axiosInstance = axios.create({
  withCredentials: true,
});



export const apiConnector=(method,url,bodyData,headers={},params=null)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData? bodyData:null,
        headers: {
            'Content-Type': 'application/json',
            ...headers, 
          },
        // headers:headers?headers:null,
        params:params?params:null,
    });
}