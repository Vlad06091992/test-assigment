import {observer} from "mobx-react";
import React from "react";
import {TaskType} from "../../../src/components/TaskList/TaskList";
import {taskStore} from "../../../src/store";

export const Task = observer(({task}: { task: TaskType }) => {
    const handleAddSubtask = () => {
        taskStore.addSubtask(task.id);

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