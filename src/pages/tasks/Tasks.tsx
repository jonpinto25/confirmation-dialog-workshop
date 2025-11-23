import { memo, useCallback, useReducer, useState } from 'react';
import {AddTask} from './AddTask';
import {TaskList} from './TaskList';
import {tasksReducer} from './tasksReducer';
import type { Task } from './model';
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog/ConfirmationDialog';

import styles from './Tasks.module.scss'

let nextId = 3;
const initialTasks: Task[] = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];


export const Tasks = memo(() => {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

  const handleAddTask = useCallback((text: string) => {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }, [])

  const handleChangeTask = useCallback((task: Task) => {
    dispatch({
      type: 'changed',
      task: task,
    });
  }, [])

  const onDialogClose = useCallback(() => {
    setOnConfirmCallback(null)
    setIsDialogOpened(false)
  }, [])

  const handleDeleteTask = useCallback((taskId: number) => {
    setOnConfirmCallback(() => () => {
      dispatch({ type: 'deleted', id: taskId });
    });
    setIsDialogOpened(true);
  }, [])

  const onConfirm = useCallback(() => {
    if (onConfirmCallback) {
      onConfirmCallback()
    }
    onDialogClose()
  }, [onDialogClose, onConfirmCallback])

  return (
    <>
      <h2>Prague itinerary</h2>
      <div className={styles['container']}>
        <AddTask onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
      <ConfirmationDialog open={isDialogOpened} onClose={onDialogClose} onConfirm={onConfirm} />
    </>
  );
})
