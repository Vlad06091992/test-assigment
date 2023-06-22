import styles from "./TaskInfo.module.scss";
import { observer } from "mobx-react";
import { taskStore } from "../../store";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export const TaskInfo = observer(() => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [find, setFind] = useState("");
  let [findRes, setFindRes] = useState<any>("");

  const setTitleHandler = () => {
    taskStore.addSubtask(taskStore.currentTask?.id, title);
    setTitle("");
  };

  const setEditTaskDescriptionHandler = () => {
    taskStore.editTaskDescription(taskStore.currentTask?.id, description);
    setDescription("");
  };

  const findHandler = () => {
    setFindRes(taskStore.findTask(find));
    setFind("");
  };

  return (
    <div className={styles.TaskInfo}>
      info :)
      <div>
        <div>{taskStore.currentTask?.title || "choose a task"}</div>
        {taskStore.currentTask && (
          <div>{taskStore.currentTask?.description || "add description"}</div>
        )}
      </div>
      {taskStore.currentTask && (
        <div>
          <div style={{ margin: "10px" }}>
            <TextField
              value={title}
              onChange={(e: any) => setTitle(e.currentTarget.value)}
              size={"small"}
            />

            <Button variant={"contained"} onClick={setTitleHandler}>
              add subtask
            </Button>
          </div>
          <div style={{ margin: "10px" }}>
            <TextField
              value={description}
              onChange={(e: any) => setDescription(e.currentTarget.value)}
              size={"small"}
            />
            <Button
              variant={"contained"}
              onClick={setEditTaskDescriptionHandler}
            >
              edit description
            </Button>
          </div>
        </div>
      )}
      <div>find task</div>
      <TextField
        onFocus={() => setFindRes("")}
        value={find}
        onChange={(e: any) => setFind(e.currentTarget.value)}
        size={"small"}
      />
      <Button onClick={findHandler}>find</Button>
      {findRes && <div>Not found</div>}
    </div>
  );
});
