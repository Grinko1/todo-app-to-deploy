import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/storeProvider/config/StateSchema';
import { Todo } from 'entities/todo/model/types/todo';

export const toggleCompleted = createAsyncThunk<Todo, string, ThunkConfig<string>>(
  'todo/toggleCompleted',
  async (id, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.patch<Todo>(`/api/todos/toggleCompleted/${id}`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Не удалось переключить статус');
    }
  },
);
