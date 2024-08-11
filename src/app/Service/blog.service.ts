import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Blog } from '../Model/blog';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  private baseUrl = '/Blog';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    const url = `${this.baseUrl}/GetBlogs`;
    return this.http.get<Blog[]>(url);
  }

  getBlog(id:number): Observable<Blog> {
    const url = `${this.baseUrl}/GetBlog`;
    return this.http.get<Blog>(`${url}/${id}`);
  }

  createBlog(blog: Blog): Observable<Blog> {
    const url = `${this.baseUrl}/CreateBlog`;
    return this.http.post<Blog>(url, blog);
  }

  updateBlog(id: number, blog: Blog): Observable<void> {
    const url = `${this.baseUrl}/UpdateBlog`;
    return this.http.put<void>(`${url}/${id}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    const url = `${this.baseUrl}/DeleteBlog`;
    return this.http.delete<void>(`${url}/${id}`);
  }
  
}
