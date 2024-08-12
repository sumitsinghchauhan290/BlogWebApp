import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from 'src/app/Model/blog';
import { BlogService } from 'src/app/Service/blog.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blog-register',
  templateUrl: './blog-register.component.html',
  styleUrls: ['./blog-register.component.css']
})
export class BlogRegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  private searchSubject = new Subject<string>();

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.getBlogList(this.searchTerm, 1, this.pageSize);
    });
    this.getBlogList(this.searchTerm, this.currentPage, this.pageSize);
  }

  ngAfterViewInit() {
    this.blogService.reloadData.subscribe((next) => {
      this.getBlogList(this.searchTerm, this.currentPage, 10);
    })
  }
  ngOnDestroy() {
    this.searchSubject.complete();
  }
  getBlogList(searchTerm: string, pageNumber: number, pageSize: number) {
    this.blogService.getBlogs(searchTerm, pageNumber, pageSize).subscribe((r: any) => {
      this.blogs = r.data;
      this.pageSize = r.pageSize
      this.totalPages = r.totalPages;
      this.currentPage = r.currentPage;
    });
  }

  CreateBlog(): void {
    const newBlog: Blog = {
      id: this.generateId(),
      username: '',
      dateCreated: new Date(),
      text: '',
      isNew: true
    };

    this.blogs.unshift(newBlog);
  }

  onDeleteBlog(blog: Blog): void {

    if (blog.id) {

      this.blogService.deleteBlog(blog.id).subscribe({
        next: (r: any) => {
          this.getBlogList(this.searchTerm, this.currentPage, 10);
        },
        error: (err: Error) => {
          alert("Blog is not deleted. Something went wrong.")
        }
      })
    }
  }

  private generateId(): number {
    const maxId = this.blogs.length ? Math.max(...this.blogs.map(b => b.id ?? 0)) : 0;
    return maxId + 1;
  }

  undoNewCreatedBlog(blog: Blog) {
    this.blogs = this.blogs.filter(b => b !== blog);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getBlogList(this.searchTerm, this.currentPage, 10);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getBlogList(this.searchTerm, this.currentPage, 10);
    }
  }

  filterBlogs() {
    this.searchSubject.next(this.searchTerm);
  }

}
