import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Embed from "@editorjs/embed";
// @ts-ignore
import Quote from "@editorjs/quote";
import { createBlog } from './service';
import { checkMe } from './service'

export async function newPage() {
    const app = document.getElementById("app")
    if (app) {
        const password = localStorage.getItem("password");
        if (!password) {
            alert("No access");
            app.innerHTML = `
                <a href='/'>Go back</a>
            `
        } else {
            const itIsMe = await checkMe(password);
            if (itIsMe) {
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
                        window.location.href = `#${response.blogId}`
                    })
                })
            } else {
                alert("No access");
                app.innerHTML = `
                    <a href='/'>Go back</a>
                `
            }
        }

        
    }
}