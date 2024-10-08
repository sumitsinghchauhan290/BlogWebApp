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

    this.bindBlogForm(false);

    if (this.blog.isNew) {
      this.isEdit = true;
    }
  }
  bindBlogForm(forEdit: boolean) {
    if (forEdit) {
      this.blogService.getBlog(this.blog.id).subscribe({
        next: (item: Blog) => {

          this.isEdit = true;
          this.originalBlog = { ...this.blog };

          this.blogForm = this.formBuilder.group({
            UsernameName: [item.username, [Validators.required, Validators.maxLength(255)]],
            DateCreated: [{ value: this.datepipe.transform(item.dateCreated, 'dd/MM/yyyy') || '', disabled: true }, [Validators.required]],
            Text: [item.text, [Validators.required]],
          });
        }
      })
    } else {
      this.blogForm = this.formBuilder.group({
        UsernameName: [this.blog.username, [Validators.required, Validators.maxLength(255)]],
        DateCreated: [{ value: this.datepipe.transform(this.blog.dateCreated, 'dd/MM/yyyy') || '', disabled: true }, [Validators.required]],
        Text: [this.blog.text, [Validators.required]],
      });
    }

  }
  saveBlog(): void {
    const blogForApi: BlogForApi = {
      id: this.blog.id,
      username: this.blogForm.get('UsernameName')?.value,
      dateCreated: this.blog.dateCreated,
      text: this.blogForm.get('Text')?.value
    };
    if (this.blogValidator(blogForApi)) {
      if (this.blog.isNew) {
        this.blogService.createBlog(blogForApi).subscribe(response => {
          this.isEdit = false;
          this.originalBlog = null;
          this.blog.isNew = false;
          this.blog.dateCreated = response.dateCreated;
          this.blog.id = response.id
          this.blog.text = response.text;
          this.blog.username = response.username;
          this.blogService.reloadData.next(true);
        });
      } else {
        this.blogService.updateBlog(blogForApi.id, blogForApi).subscribe(response => {
          this.isEdit = false;
          this.originalBlog = null;
          this.blog.isNew = false;
          this.blog.text = blogForApi.text;
          this.blog.username = blogForApi.username;
          this.blogService.reloadData.next(true);
        });
      }
      
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
    if (confirm("Are you sure you want to delete this blog?")) {
      this.delete.emit(this.blog);
    }
  }

  editBlog(): void {
    this.bindBlogForm(true);
  }

  blogValidator(blog: BlogForApi): boolean {
    if (!blog.id || blog.id == 0) {
      return false;
      this.showFormAlert();
    }
    if (!blog.username || blog.username == "") {
      this.showFormAlert();
      return false;
    }
    if (!blog.text || blog.text == "") {
      this.showFormAlert();
      return false;
    }
    return true;
  }
  showFormAlert() {
    alert("Please complete all required fields before submitting the form.");
  }
}
