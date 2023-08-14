import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  workerSignupUrl = 'http://localhost:3000/workerSignup'
  url = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  workerSignup(data:any): Observable<any> {
    return this.http.post<any>(this.workerSignupUrl, data)
  }

  otpVerify(otp:any): Observable<any> { 
    return this.http.post<any>('http://localhost:3000/workerOtpProcess', {otp})
  }

  fetchCategory(): Observable<any> {
    return this.http.get<any> (this.url+'FetchCategory')
  }

  workerLogin(loginData: any): Observable<any>{
    console.log('lgon data', loginData);
    
    return this.http.post<any>(this.url+'workerLogin', loginData)
  }

}
