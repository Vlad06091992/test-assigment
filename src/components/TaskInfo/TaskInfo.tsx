import styles from "./TaskInfo.module.scss";
import {observer} from "mobx-react";
import {taskStore} from "../../store";

export const TaskInfo =observer( () => {

    console.log(taskStore.currentTask)

    return <div className={styles.TaskInfo}>info :)

        <div>
            <div>{taskStore.currentTask?.title || 'set task'}</div>
            <div>{taskStore.currentTask?.description}</div>
        </div>

    </div>
})