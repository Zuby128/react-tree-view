import React, { useState } from "react";

const TreeNode = React.memo(({ node, handleCheck }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onCheck = (e) => {
    const isChecked = e.target.checked;
    handleCheck(node.Id, isChecked);
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Expand/Collapse Button */}
        {node.children && node.children.length > 0 && (
          <button onClick={toggleExpand} style={{ marginRight: 5 }}>
            {isExpanded ? "-" : "+"}{" "}
            {/* Show '-' when expanded, '+' when collapsed */}
          </button>
        )}
        {/* Checkbox and Label */}
        <input
          type="checkbox"
          checked={node.checked}
          onChange={onCheck}
          style={{ marginRight: 5 }}
        />
        <span>
          {node.Title} - {node.Name}
        </span>{" "}
        {/* Display the node's name and title */}
      </div>

      {/* Recursively render child nodes if expanded */}
      {isExpanded && node.children && (
        <div>
          {node.children.map((childNode) => (
            <TreeNode
              key={childNode.Id}
              node={childNode}
              handleCheck={handleCheck}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default TreeNode;
