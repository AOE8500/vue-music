import axios from 'axios'
import qs from 'qs'


// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.baseURL = 'http://192.168.0.155:8880/';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.status == 200){
        // _.toast(res.data.msg);
    	return res;
    }
    return Promise.reject(res);	
}, (error) => {
    _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

export const  fetch =  {
	getAjax:function(url){
		return new Promise((resolve, reject) => {
	        axios.get(url)
	            .then(response => {
	                resolve(response.data);
	            }, err => {
	                reject(err);
	            })
	            .catch((error) => {
	               reject(error)
	            })
	    })
	},
	postAjax:function(url, params){
		console.log(params)
		return new Promise((resolve, reject) => {
	        axios.post(url, params)
	            .then(response => {
	                resolve(response.data);
	            }, err => {
	                reject(err);
	            })
	            .catch((error) => {
	               reject(error)
	            })
	    })
	}
	    
}

export default {
    get(url,params){
    	var param = params == undefined?"":params;
    	return fetch.getAjax(url + param)
    },
    post(url,params){
    	return fetch.postAjax(url, params)
    }
}

