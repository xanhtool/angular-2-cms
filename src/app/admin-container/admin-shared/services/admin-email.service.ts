import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminEmailService {

  constructor(
    private http: HttpClient
  ) { }

  getTemplates() {
    return this.http.get('/api/v1/templates').map((data:any) => data.templates)
  }

  sendCampain(form) {
    return this.http.post('api/v1/campain',form)
  }
}
