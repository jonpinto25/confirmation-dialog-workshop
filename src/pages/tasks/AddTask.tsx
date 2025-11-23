import { memo, useState, type ChangeEvent, type FormEvent } from "react"
import styles from './AddTask.module.scss'


export const AddTask = memo(({onAddTask}: {onAddTask: (value: string) => void}) => {
    const [task, setTask] = useState<string>('')

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
      };

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (task.trim()) {
            onAddTask(task)
            setTask('')
        }
    }

    return (
        <form className={styles['add-task']} onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Add task" 
                value={task}
                onChange={handleTextChange}
                name="add_task"
                id="add_task"
                aria-label="add a new task"
            />
            <button type="submit">Add</button>
        </form>
    )
})