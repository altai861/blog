import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import EditorjsList from '@editorjs/list';
import CheckList from '@editorjs/checklist';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table'
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';
import CodeTool from '@editorjs/code';
import RawTool from '@editorjs/raw';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';





@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {
  private editor!: EditorJS;

  @ViewChild('editor', { static: true }) editorElement!: ElementRef;

  ngOnInit(): void {
    this.initializeEditor();
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  private initializeEditor(): void {
    this.editor = new EditorJS({
      holder: this.editorElement.nativeElement,
      placeholder: 'Start writing your blog...',
      tools: {
        header: Header,
        quote: Quote,
        image: SimpleImage,
        list: EditorjsList,
        checkList: CheckList,
        embed: Embed,
        table: Table,
        delimiter: Delimiter,
        warning: Warning,
        code: CodeTool,
        raw: RawTool,
        Marker: Marker,
        InlineCode: InlineCode,
      },
    });
  }

  saveContent(): void {
    this.editor
      .save()
      .then((outputData) => {
        console.log('Saved data: ', outputData);
        // Here you can handle saving the content, such as storing it in your assets
      })
      .catch((error) => {
        console.error('Error saving content: ', error);
      });
  }
}
