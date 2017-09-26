import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BlogEmailService {
  api = '/api/v1/';
  constructor(
    private http: HttpClient
  ) {
   }

  registerSubscribe() {
    return this.http.get(this.api+'testMail')
  }

}
