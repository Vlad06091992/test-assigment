import React from "react";
import { makeObservable, observable } from "mobx";
import { TaskList, TaskType } from "../src/components/TaskList/TaskList";
import { TaskInfo } from "../src/components/TaskInfo/TaskInfo";
import styles from "./App.module.scss";
import { v1 } from "uuid";

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

const App = () => {
  return (
    <div className={styles.App}>
      <TaskList />
      <TaskInfo />
    </div>
  );
};

export default App;

