import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/storeProvider/config/StateSchema';
import { Todo } from 'entities/todo/model/types/todo';


export const deleteTodo = createAsyncThunk<Todo, string, ThunkConfig<string>>(
  'todo/deleteTodo',
  async (_id, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.delete<Todo>(`/api/todos/delete/${_id}`);

      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Не удалось удалить задачу');
    }
  },
);
