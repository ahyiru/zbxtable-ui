import React,{useState,useEffect,useRef} from 'react';
import {utils} from '@common';
const {getPosition}=utils;
import './index.less';

const renderTabs=value=><div style={{padding:'6px 15px'}}>{value}</div>;

const TabHeader=({activekey,tabs=[],switchTab,trackColor})=>{
  const [active,setActive]=useState(activekey||tabs[0]?.key);
  const [pos,setPos]=useState({});
  const listRef=useRef({});
  const trackRef=useRef();
  const trackLeft=useRef(0);
  useEffect(()=>{
    trackLeft.current=getPosition(trackRef.current).left;
    const activeItem=listRef.current[active];
    activeItem.click();
  },[]);
  const onChange=(e,key)=>{
    e.stopPropagation();
    setActive(key);
    if(typeof switchTab==='function'){
      switchTab(key);
    }
    // track position
    const ele=e.currentTarget;
    const {left,width}=getPosition(ele);
    setPos({left:left-trackLeft.current,width});
  };
  return <ul className="tabs-header" ref={trackRef}>
    {
      tabs.map(v=><li key={v.key} ref={el=>listRef.current[v.key]=el} className={`th-item${active===v.key?' active':''}`} onClick={e=>onChange(e,v.key)}>
        {typeof v.renderTabs==='function'?v.renderTabs(v,active===v.key):renderTabs(v.value)}
      </li>)
    }
    <div className="th-track" style={{...pos,color:trackColor}} />
  </ul>;
};

export default TabHeader;






