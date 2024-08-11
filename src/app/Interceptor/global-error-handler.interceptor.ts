import { ErrorHandler, Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable()
export class GlobalErrorHandlerInterceptor implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        this.displayError("No internet connection. Please check your network.");
      } else {
        switch (error.status) {
          case 400:
            this.displayError("Bad Request. Please check your input and try again.");
            break;
          case 404:
            this.displayError("Not Found. The requested resource could not be found.");
            break;
          case 500:
            this.displayError("Internal Server Error. Please try again later.");
            break;
          default:
            this.displayError("An unexpected error occurred. Please try again later.");
        }
      }
    } else {
      this.displayError("An unexpected error occurred. Please try again.");
    }

    console.error('Error occurred:', error);
  }

  private displayError(message: string): void {
    alert(message);
  }
}
