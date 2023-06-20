import {observer} from "mobx-react";
import React from "react";
import {TaskType} from "../components/TaskList";
import {taskStore} from "../store";
import {TreeItem} from "@mui/lab";

export const Task = observer(({task}: { task: TaskType }) => {
    const handleAddSubtask = () => {
        const newSubtask = prompt('Enter subtask title:') || 'newsubTask';
        if (newSubtask.trim() !== '') {
            taskStore.addSubtask(task.id, newSubtask);
        }
    };

    return (
        <div>
            <h3>{task.title}</h3>
            <ul>
                {task.subtasks?.map((subtask: any, index: number) => (
                    <Task key={index} task={subtask}/>
                ))}
            </ul>
            <button onClick={handleAddSubtask}>Add Subtask</button>
        </div>
    );
});