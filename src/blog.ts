export function blogPage(path: string) {
    const app = document.getElementById("app")
    if (app) {
        app.innerHTML = `Blog with the id of ${path}`;
    }
}