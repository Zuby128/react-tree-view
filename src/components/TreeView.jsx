import React, { useEffect, useState } from "react";
import TreeNode from "./TreeNode";
import Loading from "./Loading";

const TreeView = ({
  treeData,
  nonExistedList,
  cyclicDependencies,
  loading,
}) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [nodes, setNodes] = useState(treeData);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [errorStaff, setErrorStaff] = useState([]);
  const [cyclicError, setCyclicError] = useState([]);

  useEffect(() => {
    setNodes(treeData);
    setErrorStaff(nonExistedList);
    setCyclicError(cyclicDependencies);
  }, [treeData, nonExistedList]);

  const updateNodeAndChildren = (node, checked) => {
    node.checked = checked;

    if (checked) {
      setSelectedStaff((prev) => [...prev, node.Id]);
    } else {
      setSelectedStaff((prev) => prev.filter((id) => id !== node.Id));
    }

    if (node.children) {
      node.children = node.children.map((child) =>
        updateNodeAndChildren(child, checked)
      );
    }
    return node;
  };

  const handleCheck = (id, checked) => {
    const updateNodeState = (nodes) => {
      return nodes.map((node) => {
        if (node.Id === id) {
          node = updateNodeAndChildren(node, checked);
        } else if (node.children) {
          node.children = updateNodeState(node.children);
        }
        return node;
      });
    };

    const updatedNodes = updateNodeState(nodes);
    setNodes(updatedNodes);
  };

  const onSelectedStaff = () => {
    if (selectedStaff.length === 0) return;
    setButtonLoading(true);
    const staffs = selectedStaff.join(", ");

    setTimeout(() => {
      setButtonLoading(false);
      alert(`selected staff ids sent to DB as:\n${staffs}`);
    }, 1500);
  };

  return (
    <div className="tree-view">
      <h1>Technical Assessment</h1>
      <h2>hierarchical Structure of Company</h2>
      <div>
        {!loading ? (
          nodes?.map((node) => (
            <TreeNode key={node.Id} node={node} handleCheck={handleCheck} />
          ))
        ) : (
          <div className="loading-wrapper">
            <Loading width="50px" height="50px" />
          </div>
        )}
      </div>
      <button className="selected-button" onClick={onSelectedStaff}>
        Selected Staffs
        {buttonLoading && <Loading width="15px" height="15px" />}
      </button>
      <hr />
      <h2>Staffs Have Invalid Managers</h2>
      <div>
        {!loading ? (
          <div
            style={errorStaff.length > 0 ? { color: "red" } : { color: "blue" }}
          >
            {errorStaff.length > 0 ? (
              <table>
                {errorStaff?.map((v) => (
                  <tr>
                    <th>Id:</th>
                    <td>{v?.Id}</td>
                    <th>Name:</th>
                    <td>{v?.Name}</td>
                  </tr>
                ))}
              </table>
            ) : (
              "There is no invalid manager."
            )}
          </div>
        ) : (
          <div className="loading-wrapper">
            <Loading width="50px" height="50px" />
          </div>
        )}
      </div>
      <hr />
      <div>
        {!loading ? (
          <div>
            {errorStaff.length > 0
              ? cyclicDependencies?.map((v) => (
                  <div className="alert">
                    Cycled dependency detected between these ids: {v.join(", ")}
                  </div>
                ))
              : "No cycled dependencies."}
          </div>
        ) : (
          <div className="loading-wrapper">
            <Loading width="50px" height="50px" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeView;
