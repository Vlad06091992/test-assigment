import {action, makeObservable, observable} from "mobx";
import {v1} from "uuid";
import {TaskType} from "./components/TaskList";
import {findSubtasksById} from "./utils/findSubtasksById";
import {Task} from "./App";
import {findTaskById} from "./utils/findTaskById";
import {removeCheckedItems} from "./utils/removeCheckedItems";

class TaskStore {
    taskList: TaskType[] = [
        {
            title: 'Task 1',
            checked:false,
            id: 'abc',
            subtasks: [
                {
                    title: 'Task 1.1',
                    checked:false,
                    id: 'def',
                    subtasks: [
                        {
                            title: 'Task 1.1.1',
                            checked:false,
                            id: 'ghi',
                            subtasks: [
                                {
                                    title: 'Task 1.1.1.1',
                                    checked:false,
                                    id: 'jkl',
                                    subtasks: [

                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },{
            title: 'Task 2',
            checked:false,
            id: 'mnp',
            subtasks: [
                {
                    title: 'Task 2.1',
                    checked:false,
                    id: 'fkdfd',
                    subtasks: [

                    ]
                }
            ]
        },
        {
            title: 'Task 3',
            checked:false,
            id: 'fksdl',
            subtasks: [

            ]
        }

    ];

    constructor() {
        makeObservable(this, {
            taskList: observable,
            addTask: action,
            addSubtask: action,
            checkedTask: action,
            removeCheckedTasks:action
        });
    }

    addTask(title: string) {
        debugger
        console.log(this.taskList)
        const task = new Task(title,[], v1());
        this.taskList.push(task);
    }

    addSubtask(taskId: string, title: string) {
        let arr = findSubtasksById(this.taskList, taskId)
        arr.push({
            id: v1(), title: title,
            subtasks: [],
        })
    }

    checkedTask(taskId: string) {
        let task = findTaskById(this.taskList,taskId)
        task.checked = !task.checked
    }

    removeCheckedTasks() {
       this.taskList =  removeCheckedItems(this.taskList)
    }




}

export const taskStore = new TaskStore();