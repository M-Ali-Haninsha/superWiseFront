import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminWorker } from '../../models/api.models';
import { AdminServiceService } from '../../services/admin-service.service';
import { AdminWorkersActions } from './admin-workers.actions';
import { loadUnverified } from './admin-workers.effects';
import { adminWorkersFeature, initialState } from './admin-workers.reducer';

const worker = { _id: 'w1', firstName: 'Ravi', email: 'r@example.com' } as AdminWorker;
const reducer = adminWorkersFeature.reducer;

describe('admin workers state', () => {
  describe('reducer', () => {
    it('sets loading while a list is being fetched', () => {
      expect(reducer(initialState, AdminWorkersActions.loadVerified()).loading).toBe(true);
    });

    it('stores each list separately', () => {
      let state = reducer(initialState, AdminWorkersActions.loadSuccess({ kind: 'unverified', workers: [worker] }));
      state = reducer(state, AdminWorkersActions.loadSuccess({ kind: 'verified', workers: [] }));

      expect(state.unverified).toEqual([worker]);
      expect(state.verified).toEqual([]);
      expect(state.loading).toBe(false);
    });

    it('keeps the error message on failure', () => {
      const state = reducer(initialState, AdminWorkersActions.loadFailure({ error: 'Forbidden' }));
      expect(state.error).toBe('Forbidden');
    });

    it('exposes selectors for each list', () => {
      const root = { adminWorkers: { ...initialState, unverified: [worker] } };
      expect(adminWorkersFeature.selectUnverified(root)).toEqual([worker]);
    });
  });

  describe('loadUnverified effect', () => {
    let actions$: Observable<Action>;
    const api = { getWorkers: vi.fn() };

    const runEffect = () =>
      TestBed.runInInjectionContext(() => firstValueFrom(loadUnverified()));

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideMockActions(() => actions$), { provide: AdminServiceService, useValue: api }],
      });
    });

    it('loads unverified workers from the API', async () => {
      actions$ = of(AdminWorkersActions.loadUnverified());
      api.getWorkers.mockReturnValue(of({ workers: [worker] }));

      expect(await runEffect()).toEqual(AdminWorkersActions.loadSuccess({ kind: 'unverified', workers: [worker] }));
    });

    it("reports the API's error message", async () => {
      actions$ = of(AdminWorkersActions.loadUnverified());
      api.getWorkers.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 403, error: { message: 'Forbidden' } })),
      );

      expect(await runEffect()).toEqual(AdminWorkersActions.loadFailure({ error: 'Forbidden' }));
    });
  });
});
