import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { AuthService } from './auth.service';
import { roleGuard } from './role.guard';

describe('roleGuard', () => {
  const run = (guard: ReturnType<typeof roleGuard>) =>
    TestBed.runInInjectionContext(() =>
      guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    ) as boolean | UrlTree;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('allows the route when the role is logged in', () => {
    TestBed.inject(AuthService).login('admin', 't');
    expect(run(roleGuard('admin'))).toBe(true);
  });

  it("redirects to the role's login page otherwise", () => {
    const result = run(roleGuard('worker'));
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/workerLogin');
  });

  it('does not accept another role as a substitute', () => {
    TestBed.inject(AuthService).login('user', 't');
    expect(run(roleGuard('admin'))).not.toBe(true);
  });

  it('can redirect somewhere other than the login page', () => {
    const result = run(roleGuard('user', '/'));
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/');
  });
});
