import React from "react";
import { TaskList } from "../src/components/TaskList/TaskList";
import { TaskInfo } from "../src/components/TaskInfo/TaskInfo";
import styles from "./App.module.scss";
import { observer } from "mobx-react";

const App = observer(() => {
  return (
    <div className={styles.App}>
      <TaskList />
      <TaskInfo />
    </div>
  );
});

export default App;
