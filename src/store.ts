import {action, autorun, makeObservable, observable, toJS} from "mobx";
import {TaskType} from "../src/components/TaskList/TaskList";
import {Task} from "./App";
import {findTaskById} from "./utils/findTaskById";
import {removeCheckedItems} from "./utils/removeCheckedItems";


import makeInspectable from 'mobx-devtools-mst';
import {findTaskByTitle} from "./utils/findTaskByTitle";


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

    currentTask = null as TaskType | null

    constructor() {
        makeObservable(this, {
            taskList: observable,
            currentTask: observable,
            addTask: action,
            addSubtask: action,
            checkedTask: action,
            removeCheckedTasks: action,
            editTaskDescription: action,
            findTask:action
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

    addSubtask(taskId: string | undefined, title: string) {
        if (taskId) {
            let task = findTaskById(this.taskList, taskId)
            task.subtasks.push(
                new Task(title || 'title', [],)
            )
        }
    }


    findTask(title: string) {
        if (title) {
            let task = findTaskByTitle(this.taskList, title)
          if(task){
              this.currentTask = task
          } else {
              return 'not found'
          }
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

    editTaskDescription(taskId: string | undefined, desc: string) {
        if (taskId) {
            let task = findTaskById(this.taskList, taskId)
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


