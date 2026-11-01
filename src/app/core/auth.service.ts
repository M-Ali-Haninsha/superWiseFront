import { Injectable } from '@angular/core';
import { Role } from '../models/api.models';

// Kept under the same sessionStorage keys the app has always used.
const STORAGE_KEYS: Record<Role, string> = {
  user: 'userValue',
  worker: 'workerValue',
  admin: 'adminValue',
};

const LOGIN_ROUTES: Record<Role, string> = {
  user: '/userLogin',
  worker: '/workerLogin',
  admin: '/admin',
};

const PENDING_SIGNUP_KEY = 'pendingSignupEmail';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getToken(role: Role): string | null {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEYS[role]);
      return stored ? (JSON.parse(stored) as { token?: string }).token ?? null : null;
    } catch {
      return null;
    }
  }

  isLoggedIn(role: Role): boolean {
    return this.getToken(role) !== null;
  }

  login(role: Role, token: string): void {
    sessionStorage.setItem(STORAGE_KEYS[role], JSON.stringify({ token }));
  }

  logout(role: Role): void {
    sessionStorage.removeItem(STORAGE_KEYS[role]);
  }

  loginRoute(role: Role): string {
    return LOGIN_ROUTES[role];
  }

  /** Remembers which email is waiting for its signup OTP. */
  setPendingSignup(email: string): void {
    sessionStorage.setItem(PENDING_SIGNUP_KEY, email);
  }

  getPendingSignup(): string | null {
    return sessionStorage.getItem(PENDING_SIGNUP_KEY);
  }

  clearPendingSignup(): void {
    sessionStorage.removeItem(PENDING_SIGNUP_KEY);
  }
}
