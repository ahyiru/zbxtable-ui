import React from 'react';
import { Spin } from 'antd';
import {utils} from '@common';
const {traverItem}=utils;
const {useState,useEffect}=React;

import './index.less';

const render=(menu,toggle,getSel,childKey,idKey)=>{
  return menu.map(v=>{
    const hasChildren=v[childKey]&&v[childKey].length;
    const active=v.active?'active':'';
    if(hasChildren){
      const open=v.open?'open':'';
      return <li key={v[idKey]} onClick={e=>toggle(e,v)}>
        <a path={v.path} className={open}>
          {v.icon?v.icon:null}
          <span className="has-right-icon">{v.name}</span>
          <i className={`ivu-angle ${v.open?'top':'bottom'}`} />
        </a>
        <ul className={open}>{render(v[childKey],toggle,getSel,childKey,idKey)}</ul>
      </li>;
    }
    if(v.isNode){
      const open=v.open?'open':'';
      return <li key={v[idKey]} onClick={e=>toggle(e,v,v.isNode)}>
        <a path={v.path} className={open}>
          {v.icon?v.icon:null}
          <span className="has-right-icon">{v.name}</span>
          <i className={`ivu-angle ${v.open?'top':'bottom'}`} />
        </a>
        <ul className={open}>{render(v[childKey],toggle,getSel,childKey,idKey)}</ul>
      </li>;
    }
    return <li key={v[idKey]}>
      <a path={v.path} onClick={e=>getSel(e,v)} className={active}>
        {v.icon?v.icon:null}
        <span>{v.name}</span>
      </a>
    </li>;
  });
};

const Menu=props=>{
  const {data,selected,getSelect,childKey='children',idKey='id'}=props;
  const [menu,setMenu]=useState(props.data);
  useEffect(()=>{
    const newData=traverItem(item=>{
      if(selected&&selected[idKey]&&selected[idKey]===item[idKey]){
      // if(selected.includes(item[idKey])){
        item.active=true;
      }else{
        item.active=false;
      }
    })(data);
    setMenu([...newData]);
  },[props]);
  const toggle=(e,v,flag)=>{
    e.stopPropagation();
    if(flag){
      getSelect(v);
    }
    v.open=!v.open;
    setMenu([...menu]);
  };
  const getSel=(e,v)=>{
    e.stopPropagation();
    getSelect(v);
    const data=traverItem(item=>{
      if(item[idKey]===v[idKey]){
        item.active=true;
      }else{
        item.active=false;
      }
    })(menu);
    setMenu([...data]);
  };

  return <div className="tree-wrap">
    {
      menu?.length?<ul className="tree-root">
        {
          render(menu,toggle,getSel,childKey,idKey)
        }
      </ul>:
        <div style={{textAlign:'center',padding:'20px 0'}}><Spin /></div>
    }
  </div>;
};

export default Menu;





















