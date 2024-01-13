import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/storeProvider/config/StateSchema';
import { Todo } from 'entities/todo/model/types/todo';
import { loadTodos } from './loadTodos';

export const editTodo = createAsyncThunk<Todo, Todo, ThunkConfig<string>>(
  'todo/editTodo',
  async (todo, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    if (todo.status === 'completed') {
      todo = { ...todo, completed: true };
    } else {
      todo = { ...todo, completed: false };
    }
    try {
      const response = await extra.api.patch<Todo>(`/api/todos/update/${todo._id}`, { todo });

      if (!response.data) {
        throw new Error();
      }
      console.log(response);
      dispatch(loadTodos());
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Не удалось создать новую задачу');
    }
  },
);
