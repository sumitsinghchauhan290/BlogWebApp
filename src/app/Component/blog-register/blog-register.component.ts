import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Model/blog';
import { BlogService } from 'src/app/Service/blog.service';

@Component({
  selector: 'app-blog-register',
  templateUrl: './blog-register.component.html',
  styleUrls: ['./blog-register.component.css']
})
export class BlogRegisterComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((blogs: any) => {
      this.blogs = blogs
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
          this.blogs = this.blogs.filter(b => b !== blog);
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
}
