import '../style.css'
import axios from 'axios'

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        login(username, password);
    })
})

async function login (username, password) {
    await axios.post("http://localhost:3500/auth/admin", {
        username: username,
        password: password
    })
    .then((response) => {
        //sessionStorage.setItem("username", response.data.username)
        //window.location.replace("/blog/");
        console.log(response.data.foundUser);
        sessionStorage.setItem("userId", response.data.foundUser._id )
        window.location.replace("/blog/");
    })
    .catch((err) => {
        console.error(err);
    })
}