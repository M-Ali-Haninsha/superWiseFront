import { RazorpayResult } from '../models/api.models';

// Razorpay's checkout.js (loaded in index.html) puts this constructor on window.
export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResult) => void;
  modal?: { ondismiss?: () => void };
}

declare const Razorpay: new (options: RazorpayCheckoutOptions) => { open(): void };

export function openRazorpayCheckout(options: RazorpayCheckoutOptions): void {
  new Razorpay(options).open();
}
