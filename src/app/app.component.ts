import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TinyMCEComponent } from './components/tinymce/tinymce.component';
import { BlogMeta } from './entities/BlogMeta.model';
import { BlogListComponent } from './components/bloglist/bloglist.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TinyMCEComponent, BlogListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit() {

  }
}
