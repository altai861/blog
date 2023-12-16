import '../style.css'
import axios from 'axios'

let app = document.getElementById("app");
let adminUsername = sessionStorage.getItem("username");

document.addEventListener("DOMContentLoaded", () => {
    if (adminUsername) {
        app.innerHTML = `
            <h1>Write yourself out</h1>
        `
    } else {
        window.location.replace("/");
    }
    
})



