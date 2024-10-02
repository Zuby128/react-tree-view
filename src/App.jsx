import { useEffect, useState } from "react";
import TreeView from "./components/TreeView";
import { buildTree } from "./helpers/buildTree";
import { STAFFS } from "./fake-db/staffs";

function App() {
  const [data, setData] = useState([]);
  const [nonExist, setNonExist] = useState([]);
  const [cyclic, setCyclic] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    setTimeout(() => {
      const all = buildTree(STAFFS);

      setData(all.treeData);
      setNonExist(all.nonExistedList);
      setCyclic(all.cyclicDependencies);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="main">
        <TreeView
          treeData={data}
          nonExistedList={nonExist}
          cyclicDependencies={cyclic}
          loading={loading}
        />
      </div>
    </>
  );
}

export default App;
