import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Blog } from '../Model/blog';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BlogService implements OnDestroy{

  private baseUrl = '/Blog';
  public reloadData: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) { }
  
  ngOnDestroy(): void {
    this.reloadData.complete(); 
  }

  getBlogs(searchTerm: string, pageNumber: number, pageSize: number): Observable<Blog[]> {
    const url = `${this.baseUrl}/GetBlogs`;
    return this.http.get<Blog[]>(`${url}?searchTerm=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getBlog(id: number): Observable<Blog> {
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
