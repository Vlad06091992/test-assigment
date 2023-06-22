import {TaskType} from "../../src/components/TaskList/TaskList";

export function removeCheckedItems(taskList:TaskType[]) {

    return taskList.filter((task) => {
        console.log(task)
        if (task.checked) {
            // Если текущий элемент отмечен для удаления, пропускаем его
            return false;
        }
        // Рекурсивно вызываем функцию для удаления из подзадач
        if (Array.isArray(task.subtasks)) {
            task.subtasks = removeCheckedItems(task.subtasks);
        }
        // Возвращаем элемент, если он не был отмечен для удаления
        return true;
    });
}