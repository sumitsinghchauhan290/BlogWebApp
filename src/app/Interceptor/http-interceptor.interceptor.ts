import { Injectable } from '@angular/core';
import { ConfigService } from '../Service/config.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private config: ConfigService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url !== 'assets/Config.json') {
      return this.getUrl().pipe(
        switchMap((url: string) => {
          const serviceUrl = `${url}`;
          const apiRequest = request.clone({ url: `${url}${request.url}` });
          return next.handle(apiRequest);
        })
      );
    }
    return next.handle(request);
  }
  private getUrl(): Observable<string> {
    return this.config.getApiUrl();
  }
}
