// TreeNode.js
import "../index.css"
import React from 'react';

const TreeNode = ({ name, children }) => (
  <div className="tree-node">
    <div className="node-content">{name}</div>
    {children && <div className="children">{children}</div>}
  </div>
);

export default TreeNode;
