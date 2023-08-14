import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map } from 'rxjs/operators';
import { AdminServiceService } from '../../services/admin-service.service'
import { fetchWorkers, fetchWorkersSuccess } from '../../states/adminStates/admin.action'

@Injectable()
export class UserEffects {
  fetchWorkers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWorkers),
      mergeMap(() =>
        this.AdminServiceService.getWorkers().pipe(
          tap(response => console.log(response.worker)),
        map(response => fetchWorkersSuccess({ workers: response.worker })),
        )
      )
    )
  );



  constructor(
    private actions$: Actions,
    private AdminServiceService: AdminServiceService,
  ) {}
}