import { memo, useCallback, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { todosActions } from 'features/todos/model/slices/todosSlice';
import { FormTodo, TodoInfo } from '../FormTodo/FormTodo';
import axios from 'axios';
import { createTodo } from '../../model/services/createTodo';

interface AddTodoProps {
  isOpen: boolean;
  onClose: () => void;
  todo: TodoInfo;
}

export const AddTodo = memo((props: AddTodoProps) => {
  const { isOpen, onClose } = props;
  const [task, setTask] = useState({ title: '', text: '', status: 'new' });
  const dispatch = useAppDispatch();

  const addNewTask = useCallback(
    (todo: TodoInfo) => {
      if (todo.text !== '' && todo.title !== '') {
        dispatch(createTodo(todo));
        onClose();
        setTask({ title: '', text: '', status: 'new' });
      }
    },
    [task],
  );
  return (
    <FormTodo
      isOpen={isOpen}
      onClose={onClose}
      todo={task}
      titleForBtn='Добавить'
      headerForForm='Добавить задачу'
      doneAction={addNewTask}
    />
  );
});
