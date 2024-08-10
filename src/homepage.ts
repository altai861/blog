import { getBlogs } from "./service"

interface Meta {
    blogId: string,
    title: string,
    categories: string,
    createdDate: Date,
    modifiedDate: Date,
    imageLink: string
}

export async function homePage() {
    const app = document.getElementById("app")
    if (app) {
        const response: Meta[] = await getBlogs();
        let blogMetaHTML = '';
        response.forEach((blog: any) => {
            blogMetaHTML += `
                <a href='#${blog.blogId}' class='meta-links'>
                    <div class='blog-meta'>
                        <h2>${blog.title}</h2>
                        ${blog.imageLink ? `<img src="${blog.imageLink}">` : ''}
                        <p>${blog.categories}</p>
                        <p>Created on: ${new Date(blog.createdDate).toLocaleDateString()}</p>
                        <a href='#${blog.blogId}'>Read</a>
                    </div>
                </a>
            `;
        });

        app.innerHTML = `
            <div class='navbar'>
                <input placeholder='search' id='blog-search-input'>
                <button type='button' id='search-button'>Search</button> 
            </div>
            <div class='blog-meta-container'>
                ${blogMetaHTML}
            </div>
        `;
        const searchButton = document.getElementById("search-button");

        searchButton?.addEventListener("click", () => {
        const input: HTMLInputElement | null = document.getElementById("blog-search-input") as HTMLInputElement | null;
        if (input) {
            const value = input.value.toLowerCase(); // Convert input value to lowercase for case-insensitive comparison
            const filteredResult: Meta[] = response.filter(blog => {
              return (
                blog.categories.toLowerCase().includes(value) ||
                blog.title.toLowerCase().includes(value)
              );
            });

            blogMetaHTML = '';
            filteredResult.forEach((blog: any) => {
                blogMetaHTML += `
                    <div class='blog-meta'>
                        <h2>${blog.title}</h2>
                        ${blog.imageLink ? `<img src="${blog.imageLink}">` : ''}
                        <p>${blog.categories}</p>
                        <p>Created on: ${new Date(blog.createdDate).toLocaleDateString()}</p>
                        <a href='#${blog.blogId}'>Read</a>
                    </div>
                `;
            });
            const container = document.querySelector(".blog-meta-container");
            if (container) {
                container.innerHTML = blogMetaHTML
            }
            
          }
    });


    }
}

