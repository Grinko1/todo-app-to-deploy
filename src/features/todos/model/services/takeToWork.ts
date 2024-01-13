import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/storeProvider/config/StateSchema';
import { Todo } from 'entities/todo/model/types/todo';

export const takeToWork = createAsyncThunk<Todo, string, ThunkConfig<string>>(
  'todo/takeToWork',
  async (id, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.patch<Todo>(`/api/todos/takeToWork/${id}`);

      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Не удалось взять в работу задачу');
    }
  },
);
