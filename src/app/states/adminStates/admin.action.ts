import { createAction, props } from '@ngrx/store';
import  {workerData}  from '../../model/workeModel';

export const fetchWorkers = createAction('[Worker] Fetch Workers');

  export const fetchWorkersSuccess = createAction(
    '[Worker] Fetch Workers Success',
    props<{ workers: workerData[] }>()
  );