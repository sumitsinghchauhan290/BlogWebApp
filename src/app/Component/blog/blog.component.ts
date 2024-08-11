import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog, BlogForApi } from 'src/app/Model/blog';
import { BlogService } from 'src/app/Service/blog.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [DatePipe]
})
export class BlogComponent implements OnInit {

  @Input() blog!: Blog;
  @Output() delete = new EventEmitter<Blog>();
  @Output() undoNewCreatedBlog = new EventEmitter<Blog>();

  blogForm: FormGroup = new FormGroup({});
  isEdit: boolean = false;
  private originalBlog: Blog | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.bindBlogForm();

    if (this.blog.isNew) {
      this.isEdit = true;
    }
  }
  bindBlogForm() {
    this.blogForm = this.formBuilder.group({
      UsernameName: [this.blog.username, [Validators.required, Validators.maxLength(255)]],
      DateCreated: [{ value: this.datepipe.transform(this.blog.dateCreated, 'dd/MM/yyyy') || '', disabled: true }, [Validators.required]],
      Text: [this.blog.text, [Validators.required]],
    });
  }
  saveBlog(): void {
    const blogForApi: BlogForApi = {
      id: this.blog.id,
      username: this.blogForm.get('UsernameName')?.value,
      dateCreated: this.blog.dateCreated,
      text: this.blogForm.get('Text')?.value
    };

    if (this.blog.isNew) {
      this.blogService.createBlog(blogForApi).subscribe(response => {
        this.isEdit = false;
        this.originalBlog = null;
        this.blog.isNew = false;
        this.blog.dateCreated = response.dateCreated;
        this.blog.id = response.id
        this.blog.text = response.text;
        this.blog.username = response.username;
      });
    } else {
      this.blogService.updateBlog(blogForApi.id, blogForApi).subscribe(response => {
        this.isEdit = false;
        this.originalBlog = null;
        this.blog.isNew = false;
        this.blog.text = blogForApi.text;
        this.blog.username = blogForApi.username;
      });
    }
  }
  cancelEditBlog() {
    if (this.originalBlog) {
      this.blog.username = this.originalBlog.username;
      this.blog.dateCreated = this.originalBlog.dateCreated;
      this.blog.text = this.originalBlog.text;
      this.blogForm.setValue({
        UsernameName: this.blog.username,
        DateCreated: this.blog.dateCreated,
        Text: this.blog.text
      });
    }
    if (this.blog.isNew) {
      this.undoNewCreatedBlog.emit(this.blog);
    }
    this.isEdit = false;
  }
  deleteBlog(): void {
    this.delete.emit(this.blog);
  }

  editBlog(): void {
    this.isEdit = true;
    this.originalBlog = { ...this.blog };
    this.bindBlogForm();
  }
  blogValidator(blog: BlogForApi): boolean {
    if(!blog.id || blog.id==0){
      alert("Id ")
    }
    if(!blog.username || blog.username==""){
      alert("username");
    }
    if(!blog.username || blog.username==""){
      alert("username");
    }
    return false;
  }
}
