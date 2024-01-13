import { memo, useEffect } from 'react';
import cls from './MainPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Todos } from '../../features/todos/index';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loadTodos } from 'features/todos/model/services/loadTodos';

interface MainPageProps {
  className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTodos());
  }, []);
  return (
    <div className={classNames(cls.MainPage, {}, [className])}>
      <Todos />
    </div>
  );
});
