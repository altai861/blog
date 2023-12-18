import './style.css'
import axios from 'axios'

let userId = sessionStorage.getItem("userId");
let app = document.getElementById("app")

document.addEventListener('DOMContentLoaded', () => {
  if (userId) {
    console.log("You are Altai");
    
    renderBlogs(1);

  } else {
    console.log("You are just reader");
    
    renderBlogs(0);
  }
})


async function renderBlogs(admin) {
  let blogs;
  await axios.get("http://localhost:3500/blog")
  .then((response) => {
    blogs = response.data
  })
  .catch((err) => {
    console.error(err);
  })
  if (admin === 1) {
    renderAdminBlogs(blogs)
  } else {
    const publicBlogs = blogs.filter(obj => obj.public === true)
    renderUserBlogs(publicBlogs)
  }
}

async function renderAdminBlogs(blogs) {
  const publicBlogs = blogs.filter(blog => blog.public === true);

  // Render blogs with 'public' value false
  const drafts = blogs.filter(blog => blog.public === false);

  // Append the rendered HTML to your page or do something else with it
  const blogsDiv = document.createElement("div");
  blogsDiv.classList = "blogs"
  const draftsDiv = document.createElement("div");
  draftsDiv.classList = "drafts"
  
  const t1 = document.createElement("h2");
  const t2 = document.createElement("h2");
  t1.textContent = "Blogs";
  t2.textContent = "Drafts";
  blogsDiv.appendChild(t1);
  draftsDiv.appendChild(t2)

  console.log(publicBlogs)
  publicBlogs.map((blog) => {
    const singleBlog = document.createElement("div");
    singleBlog.classList = "single-blog"
    const title = blog.blogContent.blocks.length > 0
      ? blog.blogContent.blocks[0].data.text
      : "Untitled";
    
    const tit = document.createElement("h3");
    tit.textContent = title;

    singleBlog.appendChild(tit);
    singleBlog.innerHTML += `
      <p>${blog.categories.join(' : ')}</p>
    `
    blogsDiv.appendChild(singleBlog)

    singleBlog.addEventListener("click", () => {
      sessionStorage.setItem("singleBlogId", blog._id)
      window.location.replace("/blog/singleBlog/");
    })
  })

  drafts.map((blog) => {
    const singleBlog = document.createElement("div");
    singleBlog.classList = "single-blog"
    const title = blog.blogContent.blocks.length > 0
      ? blog.blogContent.blocks[0].data.text
      : "Untitled";
    
    const tit = document.createElement("h3");
    tit.textContent = title;

    singleBlog.appendChild(tit);
    singleBlog.innerHTML += `
      <p>${blog.categories.join(' : ')}</p>
    `
    draftsDiv.appendChild(singleBlog)
    singleBlog.addEventListener("click", () => {
      sessionStorage.setItem("singleBlogId", blog._id)
      window.location.replace("/blog/singleBlog/");    })
  })


  app.appendChild(blogsDiv);
  app.appendChild(draftsDiv);
}

async function renderUserBlogs(blogs) {
  const blogsDiv = document.createElement("div");
  blogsDiv.classList = "blogs"
  const t1 = document.createElement("h2");
  t1.textContent = "Blogs";
  blogsDiv.appendChild(t1);

  blogs.map((blog) => {
    const singleBlog = document.createElement("div");
    singleBlog.classList = "single-blog"
    const title = blog.blogContent.blocks.length > 0
      ? blog.blogContent.blocks[0].data.text
      : "Untitled";
    
    const tit = document.createElement("h3");
    tit.textContent = title;

    singleBlog.appendChild(tit);
    singleBlog.innerHTML += `
      <p>${blog.categories.join(' : ')}</p>
    `
    blogsDiv.appendChild(singleBlog)
    singleBlog.addEventListener("click", () => {
      sessionStorage.setItem("singleBlogId", blog._id)
      window.location.replace("/blog/singleBlog/");    
    })
  })
  app.appendChild(blogsDiv)
}

