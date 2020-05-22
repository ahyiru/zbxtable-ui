import {utils} from '@common';
const {storage}=utils;

export const fetchApi=(url,opt={},auth=true)=>{
  const token=storage.get('token');
  const authorization={'Authorization':`basic ${token}`};
  if(auth){
    opt.headers={...opt.headers,...authorization};
  }
  if(opt.body&&typeof opt.body==='object'){
    opt.body=JSON.stringify(opt.body);
  }
  return fetch(`/api/${url}`,opt);
};


















