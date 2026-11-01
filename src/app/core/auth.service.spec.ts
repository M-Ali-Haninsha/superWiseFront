import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let auth: AuthService;

  beforeEach(() => {
    sessionStorage.clear();
    auth = TestBed.inject(AuthService);
  });

  it('stores a token per role under the existing storage keys', () => {
    auth.login('worker', 'worker-token');

    expect(auth.getToken('worker')).toBe('worker-token');
    expect(auth.isLoggedIn('worker')).toBe(true);
    expect(auth.isLoggedIn('user')).toBe(false);
    expect(JSON.parse(sessionStorage.getItem('workerValue')!)).toEqual({ token: 'worker-token' });
  });

  it('reads sessions saved by the old login code', () => {
    sessionStorage.setItem('userValue', JSON.stringify({ msg: 'passMatched', token: 'old-token' }));
    expect(auth.getToken('user')).toBe('old-token');
  });

  it('treats corrupted storage as logged out instead of throwing', () => {
    sessionStorage.setItem('adminValue', '{not json');
    expect(auth.getToken('admin')).toBeNull();
  });

  it('logs out one role without touching the others', () => {
    auth.login('user', 'u');
    auth.login('admin', 'a');
    auth.logout('user');

    expect(auth.isLoggedIn('user')).toBe(false);
    expect(auth.isLoggedIn('admin')).toBe(true);
  });

  it('remembers the email waiting for its signup OTP', () => {
    auth.setPendingSignup('a@example.com');
    expect(auth.getPendingSignup()).toBe('a@example.com');
    auth.clearPendingSignup();
    expect(auth.getPendingSignup()).toBeNull();
  });
});
