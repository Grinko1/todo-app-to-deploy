import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Todos.module.scss';
import { memo } from 'react';
import { TodoList } from 'entities/todo';
import { useSelector } from 'react-redux';
import {
  getCompletedTodo,
  getNewTodo,
  getProgressTodo,
} from 'features/todos/model/selectors/getTodos';

interface TodosProps {
  className?: string;
}

export const Todos = memo((props: TodosProps) => {
  const { className } = props;
  const newTodo = useSelector(getNewTodo);
  const progressTodo = useSelector(getProgressTodo);
  const completedTodo = useSelector(getCompletedTodo);


  return (
    <div className={classNames(cls.Todos, {}, [className])}>
      <TodoList todos={newTodo} title='Новые' />
      <TodoList todos={progressTodo} title='В работе' />
      <TodoList todos={completedTodo} title='Выполненые' />
    </div>
  );
});
