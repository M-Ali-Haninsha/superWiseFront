import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  adminLogin,
  returnedDataLogin,
} from '../adminComponents/interface/adminInterface';
import { Worker } from '../interface/interface'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  private url = environment.adminApiUrl;

  constructor(private http: HttpClient) {}

  adminSignup(data: adminLogin): Observable<returnedDataLogin> {
    return this.http.post<returnedDataLogin>(this.url + 'adminLogin', data);
  }

  getWorkers(): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url + 'adminGetWorker', requestOptions);
  }

  getVerifiedWorkers(): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(
      this.url + 'adminVerifiedGetWorker',
      requestOptions
    );
  }

  viewProof(proof: string, options: any): Observable<any> {
    return this.http.get<any>(this.url + 'adminViewProof/' + proof, options);
  }

  fetchCategory(): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url + 'adminFetchCategory', requestOptions);
  }

  addCategory(data: any): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any>(
      this.url + 'adminAddCategory',
      data,
      requestOptions
    );
  }

  editCategory(data: any, id: number): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any>(
      this.url + 'editCategory/' + id,
      data,
      requestOptions
    );
  }

  acceptWorker(data: any): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any>(this.url + 'adminAccept', data, requestOptions);
  }

  rejectWorker(data: any): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any>(this.url + 'adminReject', data, requestOptions);
  }

  blockWorker(data: any): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any>(
      this.url + 'adminBlockWorker',
      data,
      requestOptions
    );
  }

  unBlockWorker(data: any): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any>(
      this.url + 'adminUnblockWorker',
      data,
      requestOptions
    );
  }

  fetchUser(): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url + 'adminFetchUsers', requestOptions);
  }

  blockUser(data: any): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any>(
      this.url + 'adminBlockUser',
      data,
      requestOptions
    );
  }

  unBlockUser(data: any): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any>(
      this.url + 'adminUnblockUser',
      data,
      requestOptions
    );
  }

  getIncomeData(): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url + 'getIncome', requestOptions);
  }

  countDetails(): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url + 'countDetails', requestOptions);
  }

  chartValue(): Observable<any> {
    const item = 'adminValue';
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url + 'getChartValue', requestOptions);
  }
}
