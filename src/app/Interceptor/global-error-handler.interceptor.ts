import { ErrorHandler, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalErrorHandlerInterceptor implements ErrorHandler {

  constructor() { }
  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof (HttpErrorResponse)) {
      if (!navigator.onLine) {
        alert("No internet connection.");
      }else{
        alert(error.message);
      }
    }else{
      console.log(error.stack);
    }
  }
}
