import { createReduxStore, type AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import {
  type StateSchema,
  type ReduxStoreWithManager,
  type StateSchemaKey,
  type ThunkExtraArg,
  type ThunkConfig
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
  type StateSchema,
  type ReduxStoreWithManager,
  type StateSchemaKey,
  type AppDispatch,
  type ThunkExtraArg,
  type ThunkConfig
};

