import { observer } from "mobx-react";
import React from "react";
import { taskStore } from "../../store";
import { TreeView } from "@mui/lab";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./TaskList.module.scss";
import { RenderTree } from "../../components/RenderTree/RenderTree";
import { Button } from "@mui/material";

export type TaskType = {
  id: string;
  title: string;
  description?: string;
  checked?: boolean;
  subtasks?: TaskType[];
};

export const TaskList = observer(() => {
  const handleAddTask = () => {
    const newTask = prompt("Enter task title:");
    if (newTask != null) {
      if (newTask.trim() !== "") {
        taskStore.addTask(newTask);
      }
    }
  };

  const handleToggle = () => {
    taskStore.toggleThemeMode();
  };

  return (
    <div className={styles.TaskList}>
      <Button
        sx={{ margin: "10px" }}
        variant={"contained"}
        onClick={() => handleToggle()}
      >
        Toggle Theme
      </Button>
      <h2>Task List</h2>
      <p>choose a task</p>
      <Button
        sx={{ margin: "10px" }}
        variant={"contained"}
        onClick={handleAddTask}
      >
        Add Task
      </Button>
      <Button
        variant={"contained"}
        onClick={() => taskStore.removeCheckedTasks()}
      >
        Remove checked tasks
      </Button>

      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {taskStore.taskList.map((task, index) => (
          <RenderTree
            parentsChecked={task.checked}
            key={index}
            id={task.id}
            title={task.title}
            subtasks={task.subtasks}
            checked={task.checked}
          />
        ))}
      </TreeView>
    </div>
  );
});
