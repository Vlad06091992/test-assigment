import React from 'react';
import { observer } from 'mobx-react';
import {makeObservable, observable, action, toJS} from 'mobx';

type TaskType = {
    id:number
    title:string
    subtasks?:TaskType[]
}

class Task {
    title:string;
    subtasks:TaskType[];
    id: number;

    constructor(title:string, subtasks:TaskType[] = [],id:number) {
        makeObservable(this, {
            title: observable,
            subtasks: observable,
            id:observable
        });

        this.title = title;
        this.subtasks = subtasks;
        this.id = id
    }
}






class TaskStore {
    taskList:TaskType[] = [{title:'newTask 1',id:1,subtasks:[
            {title:'newTask 2',id:2,subtasks:[
                    {title:'newTask 3',id:3,subtasks:[]}
                ]}
        ]}];

    constructor() {
        makeObservable(this, {
            taskList: observable,
            addTask: action,
            addSubtask: action,
        });
    }

    addTask(title:string) {
        const task = new Task(title,[],1);
        this.taskList.push(task);
    }

    addSubtask(taskIndex:number, title:string) {
   this.taskList[taskIndex].subtasks = [{subtasks:[], id :3,title}]
        // const subtask = new Task(title,[],2);
        // if(this.taskList[taskIndex].subtasks) {
        //     this.taskList[taskIndex].subtasks.push(subtask);
        //
        // } else {
        //     this.taskList[taskIndex].subtasks = [];
        // }
    }
}

const taskStore = new TaskStore();

const TaskX = observer(({ task }:{task:TaskType}) => {

    let root = taskStore.taskList

    console.log(root)


console.log(task.id)
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
                {task.subtasks?.map((subtask:any, index:number) => (
                    <TaskX key={index} task={subtask} />
                ))}
            </ul>
            <button onClick={handleAddSubtask}>Add Subtask</button>
        </div>
    );
});

const TaskList = observer(() => {

    console.log(taskStore)

    const handleAddTask = () => {
        const newTask = prompt('Enter task title:');
        if(newTask != null){
            if (newTask.trim() !== '') {
                taskStore.addTask(newTask);
            }
        }

    };

    return (
        <div>
            <h2>Task List</h2>
            <button onClick={handleAddTask}>Add Task</button>
            {taskStore.taskList.map((task, index) => (
                <TaskX key={index} task={task} />
            ))}
        </div>
    );
});

const App = () => {
    return (
        <div>
            <TaskList />
        </div>
    );
};


export default App;