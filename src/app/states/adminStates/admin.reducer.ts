import { createReducer, on, Action } from '@ngrx/store';
import { fetchWorkersSuccess } from '../../states/adminStates/admin.action'
import { WorkerState } from '../../states/adminStates/admin.state'

export const initialState: WorkerState = {
    workers: []
  };
  

  export const workerReducer = createReducer(
    initialState,
    on(fetchWorkersSuccess, (state, { workers }) => ({
        ...state,
        workers: [...workers]
      }))
  );

  export function reducer(state: WorkerState | undefined, action: Action) {
    return workerReducer(state, action);
  }