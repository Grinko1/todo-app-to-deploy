import { memo } from 'react';
import cls from './Form.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { TodoInfo } from '../FormTodo';

interface FormProps {
  className?: string;
  onClose: () => void;
  header?: string;
  error:string;
  todo: TodoInfo;
  titleForBtn?: string;
  changeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  changeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  completeHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Form = memo((props: FormProps) => {
  const {
    className,
    onClose,
    header,
    todo,
    error,
    titleForBtn,
    changeText,
    changeTitle,
    changeStatus,
    completeHandler,
  } = props;

  return (
    <div className={classNames(cls.FormBlock, {}, [className])}>
      <h2>{header}</h2>
      <form className={cls.form}>
        <input
          type='text'
          maxLength={80}
          placeholder='Введите название'
          value={todo.title}
          onChange={(e) => changeTitle(e)}
        />
        <textarea
          placeholder='Введите описание'
          value={todo.text}
          onChange={(e) => changeText(e)}></textarea>
        <div className={cls.selectBlock}>
          <span>Выберете статус</span>
          <select value={todo.status} onChange={(e) => changeStatus(e)}>
            <option value='new'>Новая</option>
            <option value='inprogress'>В работе</option>
            <option value='completed'>Завершенная</option>
          </select>
        </div>
        {!!error.length && <span className={cls.error}>{error}</span>}
        <button onClick={(e) => completeHandler(e)}>{titleForBtn}</button>
      </form>
    </div>
  );
});
