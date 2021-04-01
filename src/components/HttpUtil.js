export default class HttpUtil{
    static get(url){  //我们定义的get函数，只需要指定访问api即可
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>{
                    if(response.ok){
                        return response.json();
                    }else{
                        throw new Error(response.status + " : "+response.statusText);
                    }
                })
                .then(result=>resolve(result))
                .catch(error=>{
                    reject(error);
                })
        });
    }

    static post(url, data){  //而post函数，不仅指定api，还需要从前端传递参数信息过来
        return new Promise((resolve,reject)=>{
            fetch(url,{ 
                method: 'POST',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Accept': '*',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                'Access-Control-Content-Type': '*',
                headers:{
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    // 'Content-Type': 'multipart/form-data'
                },
                body: JSON.stringify(data)
            })
                .then(response=>response.json())
                .then(result=>resolve(result))
                .catch(error=>{
                    reject(error);
                })
        })
    }

}