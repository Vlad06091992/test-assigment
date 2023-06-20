import {observer} from "mobx-react";
import React from "react";
import {taskStore} from "../store";
import {Task} from "./Task";
import {TreeView} from "@mui/lab";
import {RenderTree} from "../utils/renderTree";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export type TaskType = {
    id: string
    title: string
    subtasks?: TaskType[]
}


export const TaskList = observer(() => {
    const handleAddTask = () => {
        const newTask = prompt('Enter task title:');
        if (newTask != null) {
            if (newTask.trim() !== '') {
                taskStore.addTask(newTask);
            }
        }

    };

    return (
<div>

    <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
        // sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
        {taskStore.taskList.map((task, index) => (
            <RenderTree key={index} id={task.id} title={task.title} subTasks={task.subtasks}/>
        ))}
    </TreeView>




        {/*{taskStore.taskList.map((task, index) => (*/}
        {/*                <RenderTree key={index} id={task.id} title={task.title}/>*/}
        {/*            ))}*/}


</div>
        // <div>
        //     <h2>Task List</h2>
        //     <button onClick={handleAddTask}>Add Task</button>
        //     <TreeView>
        //     {taskStore.taskList.map((task, index) => (
        //         <Task key={index} task={task}/>
        //     ))}
        //     </TreeView>
        // </div>
    );
});