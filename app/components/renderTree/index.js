import React,{useState,useEffect} from 'react';
import {Tree,Tooltip} from 'antd';
import { MinusSquareOutlined } from '@ant-design/icons';
import {Link} from '@common';
import './index.less';
const { TreeNode } = Tree;

const menuTree = (data,vkey,childKey = 'children') =>
  data.map(item => {
    if (item[childKey] && item[childKey].length) {
      return (
        <TreeNode
          key={item[vkey]}
          title={
            <div className="tree-nodes">
              <span className="has-right-icon">{item.name}</span>
            </div>
          }
          item={item}
          selectable={false}
          className="tree-nodes1"
        >
          {menuTree(item[childKey],vkey)}
        </TreeNode>
      );
    }
    return (
      <TreeNode
        key={item[vkey]}
        title={
          <div className="leaf-nodes">
            <span>{item.name}</span>
          </div>
        }
        item={item}
        className="tree-nodes2"
        selectable={false}
        icon={null}
        // icon=<MinusSquareOutlined />
      />
    );
  });

const RenderTree=props=>{
  const {data,getCheckedKeys,selKeys,vkey,childKey}=props;
  const [checkedKeys,setCheckedKeys]=useState(selKeys||[]);
  const onCheck = (checkedKeys,node) => {
    console.log('onCheck', checkedKeys,node);
    setCheckedKeys(checkedKeys);
    getCheckedKeys(checkedKeys);
  };
  useEffect(()=>{
    setCheckedKeys(selKeys);
  },[selKeys]);
  // console.log(vkey);
  return <Tree
    showLine
    showIcon
    checkable
    // checkStrictly
    onCheck={onCheck}
    checkedKeys={selKeys}
    defaultExpandAll
    className="tree-check-style"
    key={vkey||'name'}
  >
    {menuTree(data,vkey||'name',childKey)}
  </Tree>;
};

export default RenderTree;

