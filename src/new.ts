import axios from 'axios';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from "@editorjs/simple-image";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import { createBlog } from './service';

const url = 'http://localhost:3500'

export async function newPage() {
    const app = document.getElementById("app")
    if (app) {
        app.innerHTML = `
            <div id='editorjs'></div>
            <button id='save-button'>SAVE</button>
        `
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
            }
        });


        const saveButton = document.getElementById("save-button");
        saveButton?.addEventListener("click", () => {
            editor.save().then(async (outputData) => {
                console.log(outputData)
                const response = await createBlog(outputData) 
                console.log(await response)
                window.location.href = `/${response.blogId}`
            })
        })
    }
}