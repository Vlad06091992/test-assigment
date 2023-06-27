import { action, autorun, makeObservable, observable, toJS } from "mobx";
import { TaskType } from "../src/components/TaskList/TaskList";
import { findTaskById } from "./utils/findTaskById";
import { removeCheckedItems } from "./utils/removeCheckedItems";

import { findTaskByTitle } from "./utils/findTaskByTitle";
import { v1 } from "uuid";

class TaskStore {
  taskList: TaskType[] = [
    {
      title: "Task 1",
      description: "my first task",
      checked: false,
      id: "abc",
      subtasks: [
        {
          title: "Task 1.1",
          description: "my first subtask",
          checked: false,
          id: "def",
          subtasks: [
            {
              title: "Task 1.1.1",
              checked: false,
              id: "ghi",
              subtasks: [
                {
                  title: "Task 1.1.1.1",
                  checked: false,
                  id: "jkl",
                  subtasks: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Task 2",
      checked: false,
      id: "mnp",
      subtasks: [
        {
          title: "Task 2.1",
          checked: false,
          id: "fkdfd",
          subtasks: [],
        },
      ],
    },
    {
      title: "Task 3",
      checked: false,
      id: "fksdl",
      subtasks: [],
    },
  ];

  currentTask = null as TaskType | null;
  isDarkMode = false;

  constructor() {
    makeObservable(this, {
      taskList: observable,
      currentTask: observable,
      isDarkMode: observable,
      setCurrentTask: observable,
      addTask: action,
      addSubtask: action,
      checkedTask: action,
      removeCheckedTasks: action,
      editTaskDescription: action,
      findTask: action,
      toggleThemeMode: action,
    });
    this.getData();
  }

  getData() {
    let savedValue = localStorage.getItem("someValue");
    if (savedValue) {
      this.taskList = JSON.parse(savedValue);
    }
  }

  addTask(title: string) {
    const task = new Task(title, []);
    this.taskList.push(task);
  }

  addSubtask(taskId: string | undefined, title: string) {
    if (taskId) {
      let task = findTaskById(this.taskList, taskId);
      task?.subtasks?.push(new Task(title || "title", []));
    }
  }

  findTask(title: string) {
    if (title) {
      let task = findTaskByTitle(this.taskList, title);
      if (task) {
        this.currentTask = task;
      } else {
        return "not found";
      }
    }
  }

  checkedTask(taskId: string, status: boolean) {
    let task = findTaskById(this.taskList, taskId);
    if (task) task.checked = status;
  }

  setCurrentTask(id: string) {
    this.currentTask = findTaskById(this.taskList, id);
  }

  removeCheckedTasks() {
    this.taskList = removeCheckedItems(this.taskList);
    this.currentTask = null;
  }

  editTaskDescription(taskId: string | undefined, desc: string) {
    if (taskId) {
      let task = findTaskById(this.taskList, taskId);
      if (task) task.description = desc;
    }
  }

  toggleThemeMode() {
    this.isDarkMode = !this.isDarkMode;
  }
}

export class Task {
  title: string;
  subtasks: TaskType[];
  id: string;
  checked: boolean | undefined;

  constructor(title: string, subtasks: TaskType[] = []) {
    makeObservable(this, {
      title: observable,
      subtasks: observable,
      id: observable,
      checked: observable,
    });

    this.title = title;
    this.subtasks = subtasks;
    this.id = v1();
    this.checked = false;
  }
}

export const taskStore = new TaskStore();

autorun(() => {
  localStorage.setItem("someValue", JSON.stringify(taskStore.taskList));
});
