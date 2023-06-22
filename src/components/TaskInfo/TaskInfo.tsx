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
    if (title.length > 0) {
      taskStore.addSubtask(taskStore.currentTask?.id, title.trim());
      setTitle("");
    }
  };

  const setEditTaskDescriptionHandler = () => {
    if (description.length > 0) {
      taskStore.editTaskDescription(
        taskStore.currentTask?.id,
        description.trim()
      );
    }
    setDescription("");
  };

  const findHandler = () => {
    setFindRes(taskStore.findTask(find.trim()));
    setFind("");
  };

  return (
    <div
      className={`${styles.TaskInfo} ${
        taskStore.isDarkMode ? styles.TaskInfoDark : ""
      }`}
    >
      <div>
        <h2>{taskStore.currentTask?.title}</h2>
        {taskStore.currentTask && (
          <h3>
            {taskStore.currentTask?.description ||
              "Add description to the current task"}
          </h3>
        )}
        <div>please enter data</div>
      </div>
      {taskStore.currentTask && (
        <div>
          <div className={styles.fieldContainer}>
            <TextField
              value={title}
              onChange={(e: any) => setTitle(e.currentTarget.value)}
              size={"small"}
            />

            <Button
              disabled={title.length == 0}
              sx={{ marginLeft: "10px" }}
              variant={"contained"}
              onClick={setTitleHandler}
            >
              add subtask
            </Button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              value={description}
              onChange={(e: any) => setDescription(e.currentTarget.value)}
              size={"small"}
            />
            <Button
              disabled={description.length == 0}
              sx={{ marginLeft: "10px" }}
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
      <Button sx={{ marginLeft: "10px" }} onClick={findHandler}>
        find
      </Button>
      {findRes && <div>Not found</div>}
    </div>
  );
});
