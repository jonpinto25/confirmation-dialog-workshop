import { memo, useCallback, useState, type FormEvent } from "react"
import type {Task} from './model'

import styles from './TaskItem.module.scss'

interface TaskItemProps {
    task: Task,
    onChangeTask: (task: Task) => void,
    onDeleteTask: (taskId: number) => void,
}

export const TaskItem = memo(({task, onChangeTask, onDeleteTask}: TaskItemProps) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [draftValue, setDraftValue] = useState<string>(task.text)

    const onSaveClick = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (draftValue.trim()) {
            onChangeTask({...task, text: draftValue})
            setEditMode(false)
        }
    }, [onChangeTask, draftValue, task])

    return (
        <li className={styles['task-item']}>
            {editMode 
                ?
                <form onSubmit={onSaveClick}>
                    <input 
                        type="text" 
                        value={draftValue} 
                        onChange={(e) => setDraftValue(e.target.value)} 
                        id={`task_${task.id}`}
                        name={`task_${task.id}`}
                        aria-label="edit task"
                    />
                    <button type="submit">Save</button>
                </form>
                :
                <>
                    {task.text}
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </>
            }           
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </li>
    )
})