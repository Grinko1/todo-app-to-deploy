import { memo, useCallback, useState } from 'react';
import cls from './FormTodo.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Form } from './Form/Form';
import { Todo } from 'entities/todo/model/types/todo';

interface FormTodoProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  todo: TodoInfo | Todo;
  doneAction: (todo: TodoInfo) => void;
  headerForForm?: string;
  titleForBtn?: string;
}
export interface TodoInfo {
  title: string;
  text: string;
  status: string;
}

export const FormTodo = memo((props: FormTodoProps) => {
  const { className, onClose, isOpen, todo, headerForForm, titleForBtn, doneAction } = props;
  const [task, setTask] = useState(todo);
  const [error, setError] = useState('');
  const changeStatus = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTask((prev) => ({ ...prev, status: e.target.value }));
  }, []);
  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({ ...prev, title: e.target.value }));
  }, []);
  const changeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask((prev) => ({ ...prev, text: e.target.value }));
  }, []);

  const editTask = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (task.text.length === 0 || task.title.length === 0) {
        setError('Все поля должны быть заполнены');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
      if (task.text !== '' && task.title !== '') {
        doneAction(task);
        onClose();
        setTask({ title: '', text: '', status: 'new' });
        setError('');
      }
    },
    [task],
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={classNames(cls.AddTodo, {}, [className])}>
      <Form
        onClose={onClose}
        header={headerForForm}
        todo={task}
        titleForBtn={titleForBtn}
        error={error}
        changeText={changeText}
        changeTitle={changeTitle}
        changeStatus={changeStatus}
        completeHandler={editTask}
      />
    </Modal>
  );
});
