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
import { checkMe, getSingleBlog, updateBlog, deleteBlog } from './service';


export async function blogPage(path: string) {
    const password = localStorage.getItem("password");
    const itIsMe = await checkMe(password);
    const app = document.getElementById("app")
    if (app) {
        app.innerHTML = `
            <div class='fixed-button-container-safe'>
                <button id='go-back-button'>Go Back</button>
                ${itIsMe ? `<button id='save-button'>Save</button>` : ''}
            </div>
            <div class='fixed-button-container-danger'>
                ${itIsMe ? `<button id='delete-button'>Delete</button>` : ''}
            </div>
            <div id='editorjs'></div>
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
            data: response.blogContent,
            readOnly: itIsMe ? false : true
        });

        const goBackButton = document.getElementById("go-back-button");
        goBackButton?.addEventListener("click", () => {
            window.history.back();
        })

        if (itIsMe) {
            const saveButton = document.getElementById("save-button");
            saveButton?.addEventListener("click", () => {
                editor.save().then(async (outputData) => {
                    await updateBlog(path, outputData);
                    alert("Saved");
                })
            })

            const deleteButton = document.getElementById("delete-button");
            deleteButton?.addEventListener("click", async () => {
                const userConfirmed = confirm("Are you sure to delete this blog?");
                if (userConfirmed) {
                    await deleteBlog(path);
                    window.location.href = "/blog/"
                }
            })
        }
    }
}