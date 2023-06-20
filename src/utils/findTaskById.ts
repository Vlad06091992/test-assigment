import {TaskType} from "../components/TaskList";

export function findTaskById(taskList: TaskType[] | any, id: string): any {
    for (const task of taskList) {
        if (task.id === id) {
            return task
        } else {
            const subtasks = findTaskById(task.subtasks, id);
            if (subtasks) {
                return subtasks;
            }
        }
    }

    return null;
}