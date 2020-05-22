import {utils} from '@common';
const {params2data}=utils;
export const validPasswd=params=>{
  const url=`/api/dataQueryAnalysis/multidimensionalQuery/validPasswd`;
  return fetch(url,{
    method:'POST',
    body:params2data(params||{}),
    mode:'cors',
    credentials:'include',
    cache:'default',
    // headers:{'Content-Type':'application/json'},
    // headers:{'Content-Type':'application/x-www-form-urlencoded'},
  }).then(response=>response.json()).then((response)=>{
    return response;
  }).catch((error)=>{
    throw Error(error);
  });
};
