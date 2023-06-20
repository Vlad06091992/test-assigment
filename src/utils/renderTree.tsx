import {TreeItem} from "@mui/lab";
import React, {useEffect, useState} from "react";
import {Checkbox} from "@mui/material";
import {observer} from "mobx-react";
import {taskStore} from "../store";

interface RenderTree {
    parentsChecked?:boolean
    id: string;
    checked?: boolean
    title: string;
    subTasks?: readonly RenderTree[];
}


export const RenderTree = observer( (task: RenderTree) => {
    const [checked, setChecked] = useState(task.parentsChecked)


    useEffect(() => {
        setChecked(task.parentsChecked);
    }, [task.parentsChecked]);



    return (<TreeItem key={task.id} nodeId={task.id} label={
        <>
            <Checkbox
                checked={checked}
                tabIndex={-1}
                disableRipple
                // onClick={(event) => {
                //     event.stopPropagation()
                //     taskStore.checkedTask(task.id)
                // }}

                onClick={(event) => {
                    event.stopPropagation();
                    setChecked(!checked);
                    taskStore.checkedTask(task.id);
                }}

            />
            {task.title}
        </>
    }


    >
        {Array.isArray(task.subTasks)
            ? task.subTasks.map((task) => <RenderTree parentsChecked={checked} checked={task.checked} key={task.id} id={task.id}
                                                       title={task.title} subTasks={task.subtasks}/>)
            : null}
    </TreeItem>)
});