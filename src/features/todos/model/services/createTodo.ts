import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/storeProvider/config/StateSchema';
import { Todo } from 'entities/todo/model/types/todo';
import { TodoInfo } from 'features/todos/ui/FormTodo/FormTodo';



export const createTodo = createAsyncThunk<Todo, TodoInfo, ThunkConfig<string>>(
  'todo/createTodo',
  async (todo, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
       const completed = todo.status === "completed" ? true : false
    try {
      const response = await extra.api.post<Todo>('/api/todos/create', {...todo, completed});

      if (!response.data) {
        throw new Error();
      }

    console.log(response)
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Не удалось создать новую задачу');
    }
  },
);
