import styles from "./TaskInfo.module.scss";
import {observer} from "mobx-react";
import {taskStore} from "../../store";

export const TaskInfo =observer( () => {

    console.log(taskStore.currentTask)

    return <div className={styles.TaskInfo}>info :)

        <button onClick={()=>taskStore.addSubtask(taskStore.currentTask?.id)}>add subtask</button>
        <button onClick={()=>taskStore.editTaskDescription(taskStore.currentTask?.id)}>edit description</button>


        <div>
            <div>{taskStore.currentTask?.title || 'set task'}</div>
            <div>{taskStore.currentTask?.description}</div>
        </div>

    </div>
})