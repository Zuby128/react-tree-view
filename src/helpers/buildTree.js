export const buildTree = (staffs) => {
    const map = {};
    const nonExistedList = [];
    const cyclicDependencies = [];
    const validIds = new Set(staffs.map(staff => staff.Id));

    staffs.forEach(staff => {
        map[staff.Id] = { ...staff, children: [], checked: false };
    });

    const treeData = [];

    const visited = new Set();
    const stack = new Set();

    const dfs = (staff) => {
        if (stack.has(staff.Id)) {
            return [true, [...stack]];
        }
        if (visited.has(staff.Id)) {
            return [false];
        }

        stack.add(staff.Id);
        visited.add(staff.Id);

        if (staff.children.length > 0) {
            for (const child of staff.children) {
                const [hasCycle, path] = dfs(child);
                if (hasCycle) {
                    path.push(staff.Id);
                    return [true, path];
                }
            }
        }

        stack.delete(staff.Id);
        return [false];
    };


    staffs.forEach(staff => {
        if (staff.ManagerId === null) {
            treeData.push(map[staff.Id]);
        } else if (validIds.has(staff.ManagerId)) {
            map[staff.ManagerId].children.push(map[staff.Id]);
        } else {
            nonExistedList.push(staff);
        }
    });

    treeData.forEach(root => {
        const [hasCycle, path] = dfs(root);
        if (hasCycle) {
            cyclicDependencies.push(path);
        }
    });

    return { treeData, nonExistedList, cyclicDependencies };
};
