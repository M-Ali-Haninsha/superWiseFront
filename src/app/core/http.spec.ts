import { HttpErrorResponse } from '@angular/common/http';
import { AUTH_ROLE, asRole, errorMessage } from './http';

describe('http helpers', () => {
  it('asRole marks a request with the role whose token it needs', () => {
    expect(asRole('worker').context.get(AUTH_ROLE)).toBe('worker');
  });

  it("errorMessage returns the API's message", () => {
    const err = new HttpErrorResponse({ status: 409, error: { message: 'Already exists' } });
    expect(errorMessage(err)).toBe('Already exists');
  });

  it('errorMessage explains network failures', () => {
    expect(errorMessage(new HttpErrorResponse({ status: 0 }))).toMatch(/reach the server/);
  });

  it('errorMessage falls back for anything else', () => {
    expect(errorMessage(new Error('boom'), 'Try again')).toBe('Try again');
  });
});
