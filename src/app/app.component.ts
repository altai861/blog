import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from "./editor/editor.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EditorComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'blog';
  blogs = [];

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
      this.http.get("/meta/blogs.json").subscribe({
        next: (res: any) => {
          console.log(res);
          this.blogs = res.blogs
        },
        error: (err) => {
          console.error(err);
        }
      })
  }
}
