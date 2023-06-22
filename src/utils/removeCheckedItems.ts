import { TaskType } from "../../src/components/TaskList/TaskList";

export function removeCheckedItems(taskList: TaskType[]): TaskType[] {
  return taskList.filter((task) => {
    if (task.checked) {
      return false;
    }
    if (Array.isArray(task.subtasks)) {
      task.subtasks = removeCheckedItems(task.subtasks);
    }
    return true;
  });
}
