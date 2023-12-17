import './style.css'
import axios from 'axios'

let userId = sessionStorage.getItem("userId");
let app = document.getElementById("app")

document.addEventListener('DOMContentLoaded', () => {
  if (userId) {
    console.log("You are Altai");
    app.innerHTML = `
      <h1>What is up, Altai?</h1>
    `
  } else {
    console.log("You are just reader");
    app.innerHTML = `
      <h1>What is up, ......?</h1>
    `
  }
})