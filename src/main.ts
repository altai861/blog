import './style.css'
import { homePage } from './homepage'
import { blogPage } from './blog'

function router() {
  const path = window.location.pathname;
  if (path === "/") {
    homePage();
  } else {
    blogPage(path)
  }
}


window.addEventListener('hashchange', router);

window.addEventListener("load", router);