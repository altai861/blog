import { Component, Input, ViewChild } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'tinymce',
  standalone: true,
  imports: [EditorComponent],
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.scss']
})
export class TinyMCEComponent {

  @Input() content: string | undefined;
  @ViewChild('editor') editor!: EditorComponent;

  itIsMe: boolean = true;

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount codesample',
    base_url: `${environment.apiBasePath}/tinymce`,
    promotion: false,
    readonly: !this.itIsMe,
    menubar: this.itIsMe,
    toolbar: this.itIsMe ? 'unde redo | blocks | bold italic underline | forecolor backcolor | codesample | alignleft aligncenter alignright alignjustify | bullist numlist | table link image' : false,
    height: '100vh'
  };

  logContent() {
    console.log(JSON.stringify(this.editor.editor.getContent()));
  }
}