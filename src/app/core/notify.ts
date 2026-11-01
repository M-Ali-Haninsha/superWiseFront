import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { errorMessage } from './http';

/**
 * Shows the API's error message. Expired sessions and blocked accounts are
 * already handled by the interceptor, so they are not shown twice.
 */
export function showError(err: unknown, fallback?: string): void {
  if (err instanceof HttpErrorResponse && err.status === 401) return;
  void Swal.fire({ icon: 'error', title: 'Oops...', text: errorMessage(err, fallback) });
}

export function showSuccess(title: string, text?: string): Promise<unknown> {
  return Swal.fire({ icon: 'success', title, text });
}

/** Asks the user to confirm an action; resolves true if they did. */
export async function confirmAction(title: string, text: string, confirmButtonText: string): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'No, cancel',
  });
  return result.isConfirmed;
}
