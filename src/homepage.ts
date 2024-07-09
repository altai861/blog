import { getBlogs } from "./service"

export async function homePage() {
    const app = document.getElementById("app")
    if (app) {
        const response = await getBlogs();
        app.innerHTML = JSON.stringify(response)
    }
}