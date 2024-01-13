import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/storeProvider/config/StateSchema';
import { Todo } from 'entities/todo/model/types/todo';


export const loadTodos = createAsyncThunk<Todo[], void, ThunkConfig<string>>(
  'todo/loadTodos',
  async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<Todo[]>('/api/todos');

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Не удалось загрузить список');
    }
  },
);
