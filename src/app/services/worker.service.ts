import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { asRole } from '../core/http';
import {
  AmountRequest,
  Category,
  ClientForWorker,
  DoneResponse,
  LoginRequest,
  LoginResponse,
  OtpRequest,
  WorkerProfileUpdate,
  WorkerSelf,
  WorkRequest,
} from '../models/api.models';

const asWorker = asRole('worker');

@Injectable({ providedIn: 'root' })
export class WorkerService {
  private http = inject(HttpClient);
  private url = environment.USER_URL;

  workerSignup(data: FormData): Observable<{ otpGen: true }> {
    return this.http.post<{ otpGen: true }>(this.url + 'workerSignup', data);
  }

  otpVerify(data: OtpRequest): Observable<{ otpDone: true }> {
    return this.http.post<{ otpDone: true }>(this.url + 'workerOtpProcess', data);
  }

  fetchCategory(): Observable<{ recievedCat: Category[] }> {
    return this.http.get<{ recievedCat: Category[] }>(this.url + 'FetchCategory');
  }

  workerLogin(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + 'workerLogin', data);
  }

  fetchWorkerData(): Observable<{ data: WorkerSelf }> {
    return this.http.get<{ data: WorkerSelf }>(this.url + 'fetchWorkerData', asWorker);
  }

  editPhoto(data: FormData): Observable<DoneResponse> {
    return this.http.put<DoneResponse>(this.url + 'workerEditProfilePhoto', data, asWorker);
  }

  editDetails(data: WorkerProfileUpdate): Observable<{ updated: string }> {
    return this.http.put<{ updated: string }>(this.url + 'workerEditProfileData', data, asWorker);
  }

  fetchRequests(): Observable<{ requests: WorkRequest[] }> {
    return this.http.get<{ requests: WorkRequest[] }>(this.url + 'fetchUserRequest', asWorker);
  }

  requestAccept(requestId: string): Observable<DoneResponse> {
    return this.http.put<DoneResponse>(this.url + 'workAccept', { id: requestId }, asWorker);
  }

  requestReject(requestId: string): Observable<DoneResponse> {
    return this.http.put<DoneResponse>(this.url + 'workReject', { id: requestId }, asWorker);
  }

  fetchAcceptedWorks(): Observable<{ accepted: WorkRequest[]; completed: WorkRequest[] }> {
    return this.http.get<{ accepted: WorkRequest[]; completed: WorkRequest[] }>(this.url + 'fetchAcceptedWorks', asWorker);
  }

  editDescription(description: string): Observable<DoneResponse> {
    return this.http.put<DoneResponse>(this.url + 'updateDescription', { description }, asWorker);
  }

  showProgress(clientId: string): Observable<{ data: ClientForWorker; newData?: number }> {
    return this.http.get<{ data: ClientForWorker; newData?: number }>(this.url + 'viewProgress/' + clientId, asWorker);
  }

  updateProgress(clientId: string, progress: number): Observable<{ updated: string }> {
    return this.http.put<{ updated: string }>(this.url + 'updateWorkProgress/' + clientId, { progress }, asWorker);
  }

  postAmount(clientId: string, data: AmountRequest): Observable<DoneResponse> {
    return this.http.post<DoneResponse>(this.url + 'postAmount/' + clientId, data, asWorker);
  }

  pushImage(clientId: string, images: FormData): Observable<{ success: true }> {
    return this.http.post<{ success: true }>(this.url + 'pushImages/' + clientId, images, asWorker);
  }

  countData(): Observable<{ data: WorkerSelf; count: number; avg: number; lengthOfReq: number }> {
    return this.http.get<{ data: WorkerSelf; count: number; avg: number; lengthOfReq: number }>(
      this.url + 'getCount',
      asWorker,
    );
  }
}
