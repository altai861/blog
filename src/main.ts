import './style.css'
import { homePage } from './homepage'
import { blogPage } from './blog'
import { newPage } from './new';

function router() {
  let path = window.location.hash
  console.log(path)
  if (!path) {
    homePage();
  } else if (path === "#new") {
    newPage();
  } else {
    blogPage(path.substring(1))
  }
}


window.addEventListener('hashchange', router);

window.addEventListener("load", router);