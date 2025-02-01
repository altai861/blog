import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TinyMCEComponent } from '../../components/tinymce/tinymce.component';
import { BlogMeta } from '../../entities/BlogMeta.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Blog } from '../../entities/Blog.model';

@Component({
  selector: 'blog-list',
  imports: [CommonModule, RouterModule, TinyMCEComponent],
  templateUrl: './blogdetail.component.html',
  styleUrl: './blogdetail.component.scss',
})
export class BlogDetailComponent implements OnInit {
    blog!: Blog;
  blogId: string | null = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('blogId');

      this.http.get<Blog>(`/blogs/${this.blogId}.json`).subscribe({
        next: (res: Blog) => {
          this.blog = res;
        },
        error: (err) => {
          console.error(err);
        }
      })
  }
}
