import {TreeItem} from "@mui/lab";
import {toJS} from "mobx";
import React from "react";

interface RenderTree {
    id: string;
    title: string;
    subTasks?: readonly RenderTree[];
}


const data: RenderTree = {
    id: 'root',
    title: 'Parent',
    subTasks: [
        {
            id: '1',
            title: 'Child - 1',
        },
        {
            id: '3',
            title: 'Child - 3',
            subTasks: [
                {
                    id: '4',
                    title: 'Child - 4',
                },
            ],
        },
    ],
};


export const RenderTree = (nodes: RenderTree) => {

  let arr = toJS(nodes.subTasks)
    debugger
    console.log(arr)

   return ( <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.title} >
    {Array.isArray(arr)
            ? arr.map((task) => <RenderTree key={task.id} id={task.id} title={task.title} subTasks={task.subtasks}/>)
            : null}
    </TreeItem> )
};