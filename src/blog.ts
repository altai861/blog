import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from "@editorjs/simple-image";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import { getSingleBlog } from './service';


export async function blogPage(path: string) {
    const app = document.getElementById("app")
    if (app) {
        app.innerHTML = `
        <div id='editorjs'></div>
        <button id='save-button'>SAVE</button>
    `
    const response = await getSingleBlog(path);
    console.log(response)
    const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
            header: Header,
            image: SimpleImage,
            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },
            list: {
                class: List,
                inlineToolbar: true,
                config: {
                defaultStyle: 'unordered'
                }
            },
            embed: {
                class: Embed,
                config: {
                services: {
                    youtube: true,
                    coub: true,
                    twitter: true,
                }
                }
            },
            quote: {
                class: Quote,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+O',
                config: {
                quotePlaceHolder: "Enter a quote",
                captionPlaceHolder: "Quotes's author"
                },
            },
        },
        data: response.blogContent
    });


    const saveButton = document.getElementById("save-button");
    }
}