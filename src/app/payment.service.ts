import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  simulatePayment(amount: number): Promise<boolean> {
    return new Promise((resolve) => {
      console.log('Processing payment of $' + amount);
      setTimeout(() => resolve(true), 2000); // Simulate delay
    });
  }
}
