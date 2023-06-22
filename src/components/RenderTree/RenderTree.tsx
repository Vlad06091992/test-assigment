import {TreeItem} from "@mui/lab";
import React, {useEffect, useState} from "react";
import {Checkbox} from "@mui/material";
import {observer} from "mobx-react";
import {taskStore} from "../../store";

interface RenderTree {
    parentsChecked?: boolean
    id: string;
    checked?: boolean
    title: string;
    subtasks?: readonly RenderTree[];
}


export const RenderTree = (observer((task: RenderTree) => {
    const [checked, setChecked] = useState(task.checked )


    useEffect(() => {
        setChecked(   task.parentsChecked || task.checked )
    }, [task.parentsChecked]);


    return (<TreeItem key={task.id} nodeId={task.id} label={
        <>
            <Checkbox
                checked={checked}
                tabIndex={-1}
                disableRipple

                onClick={(event) => {
                    event.stopPropagation();
                    setChecked(!checked);
                    taskStore.checkedTask(task.id ,!checked);
                }}

            />
            {task.title}
        </>
    } onClick={()=>{taskStore.setCurrentTask(task.id)}}


    >
        {Array.isArray(task.subtasks)
            ? task.subtasks.map((el) => <RenderTree parentsChecked={checked} checked={el.checked} key={el.id} id={el.id}
                                                    title={el.title} subtasks={el.subtasks}/>)
            : null}
    </TreeItem>)
}));