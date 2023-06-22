import { TaskType } from "../../src/components/TaskList/TaskList";

export function findTaskById(
  taskList: TaskType[] | any,
  id: string
): TaskType | null {
  for (const task of taskList) {
    if (task.id === id) {
      return task;
    } else {
      const subtasks = findTaskById(task.subtasks, id);
      if (subtasks) {
        return subtasks;
      }
    }
  }

  return null;
}
