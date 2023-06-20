import React from 'react';
import {observer} from 'mobx-react';
import {makeObservable, observable, action, toJS} from 'mobx';
import {v1} from 'uuid'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {TaskList, TaskType} from "./components/TaskList";
import {RenderTree} from "./utils/renderTree";









export class Task {
    title: string;
    subtasks: TaskType[];
    id: string;

    constructor(title: string, subtasks: TaskType[] = [], id: string) {
        makeObservable(this, {
            title: observable,
            subtasks: observable,
            id: observable
        });

        this.title = title;
        this.subtasks = subtasks;
        this.id = id
    }
}








const App = () => {
    return (
        <div>
            <TaskList/>

        </div>
    );
};



export default App;























// import React from 'react';
// import {observer} from 'mobx-react';
// import {makeObservable, observable, action, toJS} from 'mobx';
// import {v1} from 'uuid'
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TreeItem from '@mui/lab/TreeItem';
//
// type TaskType = {
//     id: string
//     title: string
//     subtasks?: TaskType[]
// }
//
// function findSubtasksById(taskList: TaskType[] | any, id: string): any {
//     for (const task of taskList) {
//         if (task.id === id) {
//             return task.subtasks;
//         } else {
//             const subtasks = findSubtasksById(task.subtasks, id);
//             if (subtasks) {
//                 return subtasks;
//             }
//         }
//     }
//
//     return [];
// }
//
//
// class Task {
//     title: string;
//     subtasks: TaskType[];
//     id: string;
//
//     constructor(title: string, subtasks: TaskType[] = [], id: string) {
//         makeObservable(this, {
//             title: observable,
//             subtasks: observable,
//             id: observable
//         });
//
//         this.title = title;
//         this.subtasks = subtasks;
//         this.id = id
//     }
// }
//
//
// class TaskStore {
//     taskList: TaskType[] = [
//         {
//             title: 'Task 1',
//             id: 'abc',
//             subtasks: [
//                 {
//                     title: 'Task 2',
//                     id: 'def',
//                     subtasks: [
//                         {
//                             title: 'Task 3',
//                             id: 'ghi',
//                             subtasks: []
//                         }
//                     ]
//                 }
//             ]
//         }
//     ];
//
//     constructor() {
//         makeObservable(this, {
//             taskList: observable,
//             addTask: action,
//             addSubtask: action,
//         });
//     }
//
//     addTask(title: string) {
//         const task = new Task(title, [], v1());
//         this.taskList.push(task);
//     }
//
//     addSubtask(taskId: string, title: string) {
//
//         let arr = findSubtasksById(this.taskList, taskId)
//
//         arr.push({
//             id: v1(), title: title,
//             subtasks: [],
//         })
//
//         debugger
//
//     }
//
//
//
//
// }
//
// const taskStore = new TaskStore();
//
// const TaskX = observer(({task}: { task: TaskType }) => {
//
//     let root = taskStore.taskList
//
//     const handleAddSubtask = () => {
//         const newSubtask = prompt('Enter subtask title:') || 'newsubTask';
//         if (newSubtask.trim() !== '') {
//             taskStore.addSubtask(task.id, newSubtask);
//         }
//     };
//
//     return (
//         <div>
//             <h3>{task.title}</h3>
//             <ul>
//                 {task.subtasks?.map((subtask: any, index: number) => (
//                     <TaskX key={index} task={subtask}/>
//                 ))}
//             </ul>
//             <button onClick={handleAddSubtask}>Add Subtask</button>
//         </div>
//     );
// });
//
// const TaskList = observer(() => {
//
//     console.log(taskStore)
//
//     const handleAddTask = () => {
//         const newTask = prompt('Enter task title:');
//         if (newTask != null) {
//             if (newTask.trim() !== '') {
//                 taskStore.addTask(newTask);
//             }
//         }
//
//     };
//
//     return (
//         <div>
//             <h2>Task List</h2>
//             <button onClick={handleAddTask}>Add Task</button>
//             {taskStore.taskList.map((task, index) => (
//                 <TaskX key={index} task={task}/>
//             ))}
//         </div>
//     );
// });
//
// const App = () => {
//     return (
//         <div>
//             <TaskList/>
//         </div>
//     );
// };
//
//
//
// export default App;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
