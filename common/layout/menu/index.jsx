import React from 'react';

const {useState,useEffect}=React;

import {Link} from '@common';

import './index.less';

const render=(menu,toggle)=>{
  return menu.map(v=>{
    const hasChildren=v.children&&v.children.length;
    const active=v.active?'active':'';
    if(hasChildren){
      return <li key={v.name} onClick={e=>toggle(e,v)} /* style={{height:v.height}} */>
        <Link path={v.path} className={active} preventDefault>
          {v.icon?v.icon:null}
          <span className="has-right-icon">{v.name}</span>
          <i className={`ivu-angle ${v.open?'top':'bottom'}`} />
        </Link>
        <ul className={v.open?'open':''}>{render(v.children,toggle)}</ul>
      </li>;
    }
    return <li key={v.name}>
      <Link path={v.path} stopPropagation className={active}>
        {v.icon?v.icon:null}
        <span>{v.name}</span>
      </Link>
    </li>;
  });
};

const Menu=props=>{
  const [menu,setMenu]=useState(props.menu);
  useEffect(()=>{
    setMenu(props.menu);
  },[props]);
  const toggle=(e,v)=>{
    e.stopPropagation();
    v.open=!v.open;
    // const{height}=e.currentTarget.firstChild.getBoundingClientRect();
    // const {scrollHeight}=e.currentTarget;
    // v.height=v.open?`${scrollHeight}px`:`${height}px`;
    setMenu([...menu]);
  };

  return <div className="menu">
    <ul className="tree-root">
      {render(menu,toggle)}
    </ul>
  </div>;
};

export default Menu;





















