import { type ReducersMapObject, combineReducers, type AnyAction } from "redux";
import {
  type StateSchemaKey,
  type StateSchema,
  type ReducerManager,
  type MountedReducers,
} from "./StateSchema";
import { type Reducer } from "@reduxjs/toolkit";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);
  let keysToRemove: StateSchemaKey[] = [];
  const mountedReducers: MountedReducers = {};

  return {
    getReducerMap: () => reducers,
    getMountedReducers: () => mountedReducers,
    reduce: (state: StateSchema, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (const key of keysToRemove) {
          //@ts-ignore
          delete state[key];
        }
        keysToRemove = [];
      }
      return combinedReducer(state, action);
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      mountedReducers[key] = true;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      //@ts-ignore
      delete reducers[key];
      mountedReducers[key] = false;
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
