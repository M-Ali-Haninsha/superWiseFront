import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.userApiUrl
  constructor(private http: HttpClient) { }

  fetchCategory(): Observable<any> {
    return this.http.get<any>(this.url+'fetchCategories')
  }

  userSignupPost(data:any):Observable<any> {
    return this.http.post<any>(this.url+'userSignup', data)
  }

  userOtp(data:any):Observable<any> {    
    return this.http.post<any> (this.url+ 'userOtp', {data})
  }

  userLogin(data:any):Observable<any> {
    console.log(data);
    
    return this.http.post<any> (this.url+'userLogin', data)
  }

  fetchWorkers(id:any):Observable<any> {
    return this.http.get<any> (this.url+ 'fetchWorkers/'+ id)
  }

  userViewWorkerDetails(id:string): Observable<any> {    
    return this.http.get<any> (this.url+ 'fetchWorkerDetails/'+ id)
  }

  workerHire(data: any, id:string): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any> (this.url+ 'hireWorker/'+id, data, requestOptions)
  }

  fetchUserData(): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'fetchUserData', requestOptions)
  }

  uploadFile(file:any): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.put<any> (this.url+'updatePhoto', file, requestOptions)
  }

  listHiredWorkers(): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'hiredWorkers', requestOptions)
  }

  editUserDetails(data:any): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.put<any> (this.url+'updateUserData', data, requestOptions)
  }

  getProgressData(id:string): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'getProgressValue/'+id, requestOptions)
  }

  showAmount(workerId:string): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'getAmount/'+workerId, requestOptions)
  }

  razorpay(data:any, workerId:string):Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.post<any>(this.url+'razorpay', { data,workerId }, requestOptions)
  }

  rating(comment:string, workerId:any, starValue:any):Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };

    const requestBody = {
      comment: comment,
      starValue: starValue 
    };
    return this.http.post<any> (this.url+'rating/'+workerId, requestBody, requestOptions)
  }

  showRating(workerId:string):Observable<any> {
    return this.http.get<any> (this.url+ 'showRating/'+ workerId)
  }

  clientDetails():Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'clientDataMessage', requestOptions)
  }

  workerDetails(workerId:string):Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'workerDataMessage/'+workerId, requestOptions)
  }

  

  getprogressPhotos(workerId:string):Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+'getProgressImages/'+workerId, requestOptions)
  }

  workCompleteData(workerId:string): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.url+'workCompleteData/'+workerId, requestOptions)
  }

  getPaymentData(workerId:string):Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'getPaymentData/'+ workerId, requestOptions)
  }

  userViewHistory(): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'viewWorkHistory', requestOptions)
  }

  historyDetails(workerId:string): Observable<any> {
    const item = 'userValue'
    const headers = new HttpHeaders().set('usertype', item);
    const requestOptions = { headers: headers };
    return this.http.get<any> (this.url+'historyData/'+workerId, requestOptions)
  }

 }


