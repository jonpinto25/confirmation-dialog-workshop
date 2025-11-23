import { memo } from "react";
import type {Task} from './model'
import {TaskItem} from './TaskItem'
import styles from './TaskList.module.scss'

interface TaskListProps {
    tasks: Task[],
    onChangeTask: (task: Task) => void,
    onDeleteTask: (taskId: number) => void,
}

export const TaskList = memo(({tasks, onChangeTask, onDeleteTask}: TaskListProps) => {

    return (
        <ul className={styles['task-list']}>
            {tasks.map(task => <TaskItem key={task.id} task={task} onChangeTask={onChangeTask} onDeleteTask={onDeleteTask} />)}
        </ul>
    )
})