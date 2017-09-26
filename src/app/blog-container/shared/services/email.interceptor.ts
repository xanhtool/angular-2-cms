import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SparkpostAPIInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('sparkpost intercep hello')
    // if it is a Sparkpost API request
    if (req.url.includes('api.sparkpost.com')) {
      // we need to add an OAUTH token as a header to access the Sparkpost API
      const clone = req.clone({ setHeaders: { 'Authorization': `34c85e570d05fc0a1f0e200dc6d4103a6a666354`,'Accept': `application/json` } });
      console.log('request is',clone)
      return next.handle(clone);
    }
    // if it's not a sparkpost API request, we just handle it to the next handler
    return next.handle(req);
  }

}