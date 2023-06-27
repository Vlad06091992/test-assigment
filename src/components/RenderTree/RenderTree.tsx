// import { TreeItem } from "@mui/lab";
// import React, { useEffect, useState } from "react";
// import { Checkbox } from "@mui/material";
// import { observer } from "mobx-react";
// import { taskStore } from "../../store";
//
// interface RenderTree {
//   parentsChecked?: boolean;
//   id: string;
//   checked?: boolean;
//   title: string;
//   subtasks?: readonly RenderTree[];
// }
//
// export const RenderTree = observer((task: RenderTree) => {
//   const [checked, setChecked] = useState(task.checked);
//
//   useEffect(() => {
//     setChecked(task.parentsChecked || task.checked);
//   }, [task.parentsChecked]);
//
//   return (
//     <div style={{ display: "flex", alignItems: "center" }}>
//       <div>
//         <TreeItem
//           style={{ width: "20px" }}
//           key={task.id}
//           nodeId={task.id}
//
//           // nodeId={task.id}
//
//           // onClick={(e) => {
//           //   e.stopPropagation();
//           //   taskStore.setCurrentTask(task.id);
//           // }}
//         >
//           {Array.isArray(task.subtasks)
//             ? task.subtasks.map((el) => (
//                 <RenderTree
//                   parentsChecked={checked}
//                   checked={el.checked}
//                   key={el.id}
//                   id={el.id}
//                   title={el.title}
//                   subtasks={el.subtasks}
//                 />
//               ))
//             : null}
//         </TreeItem>
//       </div>
//       <div style={{ marginLeft: "20px", minWidth: "400px" }}>{task.title}</div>
//     </div>
//   );
// });

import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { observer } from "mobx-react";
import { taskStore } from "../../store";
import { TreeItem } from "../../../src/components/customTreeItem/CustomTreeItem";

interface RenderTree {
  parentsChecked?: boolean;
  id: string;
  checked?: boolean;
  title: string;
  subtasks?: any;
}

export const RenderTree = observer((task: RenderTree) => {
  const [checked, setChecked] = useState(task.checked);

  useEffect(() => {
    setChecked(task.parentsChecked || task.checked);
  }, [task.parentsChecked]);

  return (
    <TreeItem
      id={task.id}
      label={
        <>
          <Checkbox
            checked={checked}
            tabIndex={-1}
            disableRipple
            onClick={(event) => {
              event.stopPropagation();
              setChecked(!checked);
              taskStore.checkedTask(task.id, !checked);
            }}
          />
          {task.title}
        </>
      }
      onClick={(e: any) => {
        e.stopPropagation();
        taskStore.setCurrentTask(task.id);
      }}
    >
      {Array.isArray(task.subtasks)
        ? task.subtasks.map((el) => (
            <RenderTree
              parentsChecked={checked}
              checked={el.checked}
              key={el.id}
              id={el.id}
              title={el.title}
              subtasks={el.subtasks}
            />
          ))
        : null}
    </TreeItem>
  );
});
