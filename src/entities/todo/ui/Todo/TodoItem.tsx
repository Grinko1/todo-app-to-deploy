import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TodoItem.module.scss';
import { memo, useCallback, useState } from 'react';
import { Todo } from 'entities/todo/model/types/todo';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { FormTodo, TodoInfo } from 'features/todos/ui/FormTodo/FormTodo';
import { deleteTodo, toggleCompleted } from 'features/todos';
import { takeToWork } from 'features/todos/model/services/takeToWork';
import { editTodo } from 'features/todos/model/services/editTodo';

interface TodoProps {
  className?: string;
  todo: Todo;
}

export const TodoItem = memo((props: TodoProps) => {
  const { className, todo } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTodo(todo._id))
  };

  const handleToggleCompleted = () => {
    dispatch(toggleCompleted(todo._id))
  }
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleEditTodo = useCallback(
    (todo: TodoInfo) => {
      dispatch(editTodo(todo as Todo));
    },
    [todo],
  );
  const handleTakeToWork =() => {
    dispatch(takeToWork(todo._id))
  }
  return (
    <>
      <div className={classNames(cls.Todo, {}, [className])}>
        <div className={cls.header}>
          <div className={cls.info}>
            <input type='checkbox' checked={todo.completed} onChange={handleToggleCompleted} />
            <p> {todo.title}</p>
          </div>

          <div className={cls.actions}>
            {todo.status !== 'inprogress' && (
              <>
                <span className={cls.tip} data-title='Взять в работу'></span>
                <Button
                  onClick={handleTakeToWork}
                  data-title='Взять в работу'
                  className={cls.moveToWork}>
                  &#43;
                </Button>
              </>
            )}
            <Button className={cls.edit} onClick={() => setIsOpen(true)}>
              &#9998;
            </Button>
            <Button className={cls.delete} onClick={handleDelete}>
              &#10005;
            </Button>
          </div>
        </div>

        <p className={cls.text}>{todo.text}</p>
      </div>
      <FormTodo
        isOpen={isOpen}
        onClose={onClose}
        todo={todo}
        titleForBtn='Сохранить'
        headerForForm='Редактировать'
        doneAction={handleEditTodo}
      />
    </>
  );
});
