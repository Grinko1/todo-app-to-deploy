import { createSlice } from '@reduxjs/toolkit';
import { TodosSchema } from '../types/todosSchema';
import { createTodo } from '../services/createTodo';
import { loadTodos } from '../services/loadTodos';
import { deleteTodo } from '../services/deleteTodo';
import { takeToWork } from '../services/takeToWork';
import { toggleCompleted } from '../services/toggleCompleted';


const initialState: TodosSchema = {
  isLoading: false,
  error: null,
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Не удалось создать новую задачу';
      });
    builder
      .addCase(loadTodos.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(loadTodos.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось загрузить задачи';
      });
    builder
      .addCase(deleteTodo.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter((todo) => todo._id !== action.payload._id);
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось загрузить задачи';
      });
    builder
      .addCase(takeToWork.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(takeToWork.fulfilled, (state, action) => {
        state.isLoading = false;
        const todoToUpdate = state.todos.find((todo) => todo._id === action.payload._id);
        if (todoToUpdate) {
          todoToUpdate.status = 'inprogress';
          todoToUpdate.completed = false;
        }
      })
      .addCase(takeToWork.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось взять в работу';
      });
    builder
      .addCase(toggleCompleted.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        const todoToUpdate = state.todos.find((todo) => todo._id === action.payload._id);
        if (todoToUpdate) {
          if (todoToUpdate.status !== 'completed') {
            todoToUpdate.status = 'completed';
            todoToUpdate.completed = true;
          } else {
            todoToUpdate.status = 'new';
            todoToUpdate.completed = false;
          }
        }
      })
      .addCase(toggleCompleted.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось взять в работу';
      });
  },
});

export const { actions: todosActions } = todosSlice;
export const { reducer: todosReducer } = todosSlice;
