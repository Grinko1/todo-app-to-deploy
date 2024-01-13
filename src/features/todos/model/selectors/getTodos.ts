import { StateSchema } from 'app/providers/storeProvider/config/StateSchema';
import { createSelector } from 'reselect';

export const getIsLoading = (state: StateSchema) => state.todos.isLoading;
export const getError = (state: StateSchema) => state.todos.error;
export const getTodos = (state: StateSchema) => state.todos.todos;
export const getNewTodo = createSelector([getTodos], (todos) =>
  todos.filter((item) => item.status === 'new'),
);
export const getProgressTodo = createSelector([getTodos], (todos) =>
  todos.filter((item) => item.status === 'inprogress'),
);
export const getCompletedTodo = createSelector([getTodos], (todos) =>
  todos.filter((item) => item.status === 'completed'),
);
