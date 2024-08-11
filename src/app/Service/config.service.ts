import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getApiUrl(): Observable<any> {
    return this.http.get('assets/Config.json').pipe(
      map((data:any) => {
        return data.Api.url;
      }),
      catchError(error => {
        return throwError(() => new Error(error));
      })
    );
  }
}
