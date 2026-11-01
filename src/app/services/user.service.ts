import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { asRole } from '../core/http';
import {
  Category,
  Client,
  CreateOrderResponse,
  DoneResponse,
  HiredWorker,
  LoginRequest,
  LoginResponse,
  OtpRequest,
  Payment,
  ProgressImage,
  RazorpayResult,
  Rating,
  UserProfileUpdate,
  UserSignupRequest,
  Worker,
  WorkStatus,
} from '../models/api.models';

const asUser = asRole('user');

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private url = environment.USER_URL;

  fetchCategory(): Observable<{ result: Category[] }> {
    return this.http.get<{ result: Category[] }>(this.url + 'fetchCategories');
  }

  userSignupPost(data: UserSignupRequest): Observable<{ otpGen: true }> {
    return this.http.post<{ otpGen: true }>(this.url + 'userSignup', data);
  }

  userOtp(data: OtpRequest): Observable<{ otpDone: true }> {
    return this.http.post<{ otpDone: true }>(this.url + 'userOtp', data);
  }

  userLogin(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + 'userLogin', data);
  }

  fetchWorkers(categoryId: string): Observable<{ data: Worker[] }> {
    return this.http.get<{ data: Worker[] }>(this.url + 'fetchWorkers/' + categoryId);
  }

  userViewWorkerDetails(id: string): Observable<{ data: Worker }> {
    return this.http.get<{ data: Worker }>(this.url + 'fetchWorkerDetails/' + id);
  }

  workerHire(data: FormData, workerId: string): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'hireWorker/' + workerId, data, asUser);
  }

  fetchUserData(): Observable<{ fetchedData: Client }> {
    return this.http.get<{ fetchedData: Client }>(this.url + 'fetchUserData', asUser);
  }

  uploadFile(file: FormData): Observable<DoneResponse> {
    return this.http.put<DoneResponse>(this.url + 'updatePhoto', file, asUser);
  }

  listHiredWorkers(): Observable<{ worker: HiredWorker[] }> {
    return this.http.get<{ worker: HiredWorker[] }>(this.url + 'hiredWorkers', asUser);
  }

  editUserDetails(data: UserProfileUpdate): Observable<DoneResponse> {
    return this.http.put<DoneResponse>(this.url + 'updateUserData', data, asUser);
  }

  getProgressData(workerId: string): Observable<{ data?: number }> {
    return this.http.get<{ data?: number }>(this.url + 'getProgressValue/' + workerId, asUser);
  }

  showAmount(workerId: string): Observable<{ amount?: number }> {
    return this.http.get<{ amount?: number }>(this.url + 'getAmount/' + workerId, asUser);
  }

  /** Creates a Razorpay order for the amount the worker requested. */
  razorpay(workerId: string): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(this.url + 'razorpay', { workerId }, asUser);
  }

  /** Confirms a completed Razorpay checkout with the server. */
  verifyPayment(workerId: string, result: RazorpayResult): Observable<{ success: true }> {
    return this.http.post<{ success: true }>(this.url + 'razorpay/verify', { workerId, ...result }, asUser);
  }

  rating(comment: string, workerId: string, starValue: number): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'rating/' + workerId, { comment, starValue }, asUser);
  }

  showRating(workerId: string): Observable<{ rating: Rating[] }> {
    return this.http.get<{ rating: Rating[] }>(this.url + 'showRating/' + workerId);
  }

  clientDetails(): Observable<{ clientDataMessage: Client }> {
    return this.http.get<{ clientDataMessage: Client }>(this.url + 'clientDataMessage', asUser);
  }

  workerDetails(workerId: string): Observable<{ workerDataMessage: Worker }> {
    return this.http.get<{ workerDataMessage: Worker }>(this.url + 'workerDataMessage/' + workerId, asUser);
  }

  getprogressPhotos(workerId: string): Observable<{ progressImages: ProgressImage[] }> {
    return this.http.get<{ progressImages: ProgressImage[] }>(this.url + 'getProgressImages/' + workerId, asUser);
  }

  getPaymentData(workerId: string): Observable<{ paymentData: Client; details?: Payment }> {
    return this.http.get<{ paymentData: Client; details?: Payment }>(this.url + 'getPaymentData/' + workerId, asUser);
  }

  userViewHistory(): Observable<{ user: Client & { workStatus: WorkStatus<Worker>[] } }> {
    return this.http.get<{ user: Client & { workStatus: WorkStatus<Worker>[] } }>(this.url + 'viewWorkHistory', asUser);
  }

  historyDetails(workerId: string): Observable<{ payments: Payment[]; clientData: Client; workerData: Worker }> {
    return this.http.get<{ payments: Payment[]; clientData: Client; workerData: Worker }>(
      this.url + 'historyData/' + workerId,
      asUser,
    );
  }

  reportWorkerCall(workerId: string, reason: string): Observable<{ reportUpdated: true }> {
    return this.http.post<{ reportUpdated: true }>(this.url + 'reportWorker/' + workerId, { reason }, asUser);
  }
}
