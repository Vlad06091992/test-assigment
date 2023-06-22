import {TaskType} from "../../src/components/TaskList/TaskList";

export function findSubtasksById(taskList: any, id: string | undefined): any {
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