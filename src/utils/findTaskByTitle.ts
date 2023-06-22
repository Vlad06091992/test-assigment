import { TaskType } from "../../src/components/TaskList/TaskList";

export function findTaskByTitle(
  taskList: TaskType[] | any,
  title: string
): TaskType | null {
  for (const task of taskList) {
    if (task.title === title) {
      return task;
    } else {
      const subtasks = findTaskByTitle(task.subtasks, title);
      if (subtasks) {
        return subtasks;
      }
    }
  }

  return null;
}
