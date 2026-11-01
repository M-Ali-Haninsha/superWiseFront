import { createFeature, createReducer, on } from '@ngrx/store';
import { AdminWorker } from '../../models/api.models';
import { AdminWorkersActions } from './admin-workers.actions';

export interface AdminWorkersState {
  unverified: AdminWorker[];
  verified: AdminWorker[];
  loading: boolean;
  error: string | null;
}

export const initialState: AdminWorkersState = {
  unverified: [],
  verified: [],
  loading: false,
  error: null,
};

export const adminWorkersFeature = createFeature({
  name: 'adminWorkers',
  reducer: createReducer(
    initialState,
    on(AdminWorkersActions.loadUnverified, AdminWorkersActions.loadVerified, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AdminWorkersActions.loadSuccess, (state, { kind, workers }) => ({
      ...state,
      [kind]: workers,
      loading: false,
    })),
    on(AdminWorkersActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
  ),
});

export const {
  selectUnverified,
  selectVerified,
  selectLoading,
  selectError,
} = adminWorkersFeature;
