import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  fetchCategory(): Observable<any> {
    return this.http.get<any>(this.url+'fetchCategories')
  }

  userSignupPost(data:any):Observable<any> {
    return this.http.post<any>(this.url+'userSignup', data)
  }

  userOtp(data:any):Observable<any> {
    console.log('thissssssss', data);
    
    return this.http.post<any> (this.url+ 'userOtp', {data})
  }

  userLogin(data:any):Observable<any> {
    console.log(data);
    
    return this.http.post<any> (this.url+'userLogin', data)
  }
}
