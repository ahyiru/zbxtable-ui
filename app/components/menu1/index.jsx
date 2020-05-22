import React from 'react';
import {utils} from '@common';
const {traverItem}=utils;
const {useState,useEffect}=React;

import './index.less';

const render=(menu,toggle,getSel)=>{
  return menu.map(v=>{
    const hasChildren=v.children&&v.children.length;
    const active=v.active?'active':'';
    if(hasChildren){
      const open=v.open?'open':'';
      return <li key={v.id} onClick={e=>toggle(e,v)}>
        <a path={v.path} className={open}>
          {v.icon?v.icon:null}
          <span className="has-right-icon">{v.name}</span>
          <i className={`ivu-angle ${v.open?'top':'bottom'}`} />
        </a>
        <ul className={open}>{render(v.children,toggle,getSel)}</ul>
      </li>;
    }
    return <li key={v.id}>
      <a path={v.path} onClick={e=>getSel(e,v)} className={active}>
        {v.icon?v.icon:null}
        <span>{v.name}</span>
      </a>
    </li>;
  });
};

const Menu=props=>{
  const [menu,setMenu]=useState(props.data);
  useEffect(()=>{
    let {data,selected}=props;
    selected=selected||{};
    const newData=traverItem(item=>{
      if(item.id===selected.id){
        item.active=true;
      }else{
        item.active=false;
      }
    })(data);
    setMenu([...newData]);
  },[props]);
  const toggle=(e,v)=>{
    e.stopPropagation();
    v.open=!v.open;
    setMenu([...menu]);
  };
  const getSel=(e,v)=>{
    e.stopPropagation();
    props.getSelect(v);
    const data=traverItem(item=>{
      if(item.id===v.id){
        item.active=true;
      }else{
        item.active=false;
      }
    })(menu);
    setMenu([...data]);
  };

  return <div className="tree-wrap">
    <ul className="tree-root">
      {render(menu,toggle,getSel)}
    </ul>
  </div>;
};

export default Menu;





















