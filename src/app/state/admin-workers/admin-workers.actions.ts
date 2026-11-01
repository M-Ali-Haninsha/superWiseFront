import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AdminWorker } from '../../models/api.models';

export type WorkerListKind = 'unverified' | 'verified';

export const AdminWorkersActions = createActionGroup({
  source: 'Admin Workers',
  events: {
    'Load Unverified': emptyProps(),
    'Load Verified': emptyProps(),
    'Load Success': props<{ kind: WorkerListKind; workers: AdminWorker[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});
