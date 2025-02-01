import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TinyMCEComponent } from '../../components/tinymce/tinymce.component';
import { BlogMeta } from '../../entities/BlogMeta.model';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'blog-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './bloglist.component.html',
  styleUrl: './bloglist.component.scss',
})
export class BlogListComponent implements OnInit {
  title = 'blog';
  blogs: BlogMeta[] = [];

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    const apiUrl = `${environment.apiBasePath}/meta/blogs.json`;

      this.http.get<BlogMeta[]>(apiUrl).subscribe({
        next: (res: BlogMeta[]) => {
          console.log(res);
          this.blogs = res.map(blog => ({
            ...blog,
            date: new Date(blog.date)
          }));
          this.blogs.sort((a, b) => b.date.getTime() - a.date.getTime())
        },
        error: (err) => {
          console.error(err);
        }
      })
  }
}
