import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { errorMessage } from '../../core/http';
import { AdminServiceService } from '../../services/admin-service.service';
import { AdminWorkersActions } from './admin-workers.actions';

export const loadUnverified = createEffect(
  (actions$ = inject(Actions), api = inject(AdminServiceService)) =>
    actions$.pipe(
      ofType(AdminWorkersActions.loadUnverified),
      exhaustMap(() =>
        api.getWorkers().pipe(
          map(({ workers }) => AdminWorkersActions.loadSuccess({ kind: 'unverified', workers })),
          catchError((err: unknown) => of(AdminWorkersActions.loadFailure({ error: errorMessage(err) }))),
        ),
      ),
    ),
  { functional: true },
);

export const loadVerified = createEffect(
  (actions$ = inject(Actions), api = inject(AdminServiceService)) =>
    actions$.pipe(
      ofType(AdminWorkersActions.loadVerified),
      exhaustMap(() =>
        api.getVerifiedWorkers().pipe(
          map(({ workers }) => AdminWorkersActions.loadSuccess({ kind: 'verified', workers })),
          catchError((err: unknown) => of(AdminWorkersActions.loadFailure({ error: errorMessage(err) }))),
        ),
      ),
    ),
  { functional: true },
);
