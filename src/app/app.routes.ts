import { Routes } from '@angular/router';
import { BlogListComponent } from './components/bloglist/bloglist.component';
import { BlogDetailComponent } from './components/blogdetail/blogdetail.component';

export const routes: Routes = [
    { path: '', component: BlogListComponent },
    { path: ':blogId', component: BlogDetailComponent }
];
