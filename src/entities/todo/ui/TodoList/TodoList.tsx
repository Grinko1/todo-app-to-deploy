import { memo } from 'react';
import cls from './TodoList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Todo } from 'entities/todo/model/types/todo';
import { TodoItem } from '../Todo/TodoItem';

interface TodoListProps {
  className?: string;
  todos: Todo[];
  title: string;
}

export const TodoList = memo((props: TodoListProps) => {
  const { className, todos, title } = props;
  return (
    <div className={classNames(cls.TodoList, {}, [className])}>
      <h2>{title}</h2>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
});
