import {TaskType} from "../components/TaskList";

export function findSubtasksById(taskList: TaskType[] | any, id: string): any {
    for (const task of taskList) {
        if (task.id === id) {
            return task.subtasks;
        } else {
            const subtasks = findSubtasksById(task.subtasks, id);
            if (subtasks) {
                return subtasks;
            }
        }
    }

    return [];
}