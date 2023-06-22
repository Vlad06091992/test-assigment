import {action, autorun, makeObservable, observable, toJS} from "mobx";
import {v1} from "uuid";
import {TaskType} from "../src/components/TaskList/TaskList";
import {findSubtasksById} from "./utils/findSubtasksById";
import {Task} from "./App";
import {findTaskById} from "./utils/findTaskById";
import {removeCheckedItems} from "./utils/removeCheckedItems";


import makeInspectable from 'mobx-devtools-mst';


class TaskStore {
    taskList: TaskType[] = [
        {
            title: 'Task 1',
            description: "my first task",
            checked: false,
            id: 'abc',
            subtasks: [
                {
                    title: 'Task 1.1',
                    description: "my first subtask",
                    checked: false,
                    id: 'def',
                    subtasks: [
                        {
                            title: 'Task 1.1.1',
                            checked: false,
                            id: 'ghi',
                            subtasks: [
                                {
                                    title: 'Task 1.1.1.1',
                                    checked: false,
                                    id: 'jkl',
                                    subtasks: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            title: 'Task 2',
            checked: false,
            id: 'mnp',
            subtasks: [
                {
                    title: 'Task 2.1',
                    checked: false,
                    id: 'fkdfd',
                    subtasks: []
                }
            ]
        },
        {
            title: 'Task 3',
            checked: false,
            id: 'fksdl',
            subtasks: []
        },

    ];

    currentTask = {} as TaskType | null

    constructor() {
        makeObservable(this, {
            taskList: observable,
            currentTask: observable,
            addTask: action,
            addSubtask: action,
            checkedTask: action,
            removeCheckedTasks: action,
            editTaskDescription:action
        });
        this.getData()
    }


    getData() {
        let savedValue = localStorage.getItem('someValue');
        if (savedValue) {
            this.taskList = JSON.parse(savedValue);
        }
    }


    addTask(title: string) {
        debugger
        console.log(this.taskList)
        const task = new Task(title, []);
        this.taskList.push(task);
    }

    addSubtask(taskId: string | undefined) {

        let title = prompt('enter title')

        if(taskId){
            let task = findTaskById(this.taskList,taskId)
            task.subtasks.push(

                new Task(title || 'title',[],)

            )
        }





    }

    checkedTask(taskId: string, status: boolean) {
        let task = findTaskById(this.taskList, taskId)
        task.checked = status
    }

    setCurrentTask(id: string) {
        this.currentTask = findTaskById(this.taskList, id)
    }


    removeCheckedTasks() {
        this.taskList = removeCheckedItems(this.taskList)
        this.currentTask = null
    }

    editTaskDescription(taskId:string | undefined){
        if(taskId){
            let task = findTaskById(this.taskList,taskId)
            let desc = prompt('enter description')
            task.description = desc
        }

    }

}

export const taskStore = new TaskStore();


makeInspectable(taskStore);


autorun(() => {
    localStorage.setItem('someValue', JSON.stringify(taskStore.taskList))

    console.log(toJS(taskStore.taskList))

    // Код, который будет выполнен при каждом изменении стейта
    console.log("State has changed");
});


