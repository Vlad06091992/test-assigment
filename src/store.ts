import {action, makeObservable, observable} from "mobx";
import {v1} from "uuid";
import {TaskType} from "./components/TaskList";
import {findSubtasksById} from "./utils/findSubtasksById";
import {Task} from "./App";

class TaskStore {
    taskList: TaskType[] = [
        {
            title: 'Task 1',
            id: 'abc',
            subtasks: [
                {
                    title: 'Task 2',
                    id: 'def',
                    subtasks: [
                        {
                            title: 'Task 3',
                            id: 'ghi',
                            subtasks: []
                        }
                    ]
                }
            ]
        },

    ];

    constructor() {
        makeObservable(this, {
            taskList: observable,
            addTask: action,
            addSubtask: action,
        });
    }

    addTask(title: string) {
        const task = new Task(title, [], v1());
        this.taskList.push(task);
    }

    addSubtask(taskId: string, title: string) {

        let arr = findSubtasksById(this.taskList, taskId)

        arr.push({
            id: v1(), title: title,
            subtasks: [],
        })

        debugger

    }




}

export const taskStore = new TaskStore();