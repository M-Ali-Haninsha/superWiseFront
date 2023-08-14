import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkerState } from '../../states/adminStates/admin.state';

export const getWorkerState = createFeatureSelector<WorkerState>('worker');

export const getWorkers = createSelector(
    getWorkerState,
  (state: WorkerState) => state.workers
);