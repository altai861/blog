import '../style.css'
import axios from 'axios';
import EditorJS from '@editorjs/editorjs';
import Header from "@editorjs/header"
import RawTool from '@editorjs/raw'
import SimpleImage from "@editorjs/simple-image"
import Checklist from "@editorjs/checklist"
import List from "@editorjs/list"
import Embed from "@editorjs/embed"
import Quote from "@editorjs/quote"

const userId = sessionStorage.getItem("userId");
const blogId = sessionStorage.getItem("singleBlogId");

document.addEventListener('DOMContentLoaded', async () => {
    if (userId && blogId) {
        // admin 
        console.log('you are admin');
        let blogData = await getBlogData(blogId)
        await generateOtherInformationSection();
        generateAdminUI(blogData)
    } else if (!userId && blogId) {
        // normal reader
        console.log('you are a normal reader');
        let blogData = await getBlogData(blogId)
        console.log("FFF:", blogData)
        generateUserUI(blogData)
    } else {
        window.location.replace("/blog/");
    }
    
})


async function getBlogData(blogId) {
    try {
      const response = await axios.get(`http://localhost:3500/blog/${blogId}`);
      console.log(response.data);
      return Promise.resolve(response.data);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
  

function generateAdminUI(blog) {


    let categories = blog.categories
    let published = blog.public
    let blogContent = blog.blogContent
    let blogId = blog._id

    const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
            header: {
            class: Header,
            config: {
                placeholder: 'Enter a header',
                levels: [2, 3, 4],
                defaultLevel: 3
            }
            },
            raw: RawTool,
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
                captionPlaceHolder: "Quote\'s author"
            },
            },
        },
        data: blogContent
    });
    console.log(blog.blogContent)


    updateCategoriesList(categories)
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Category';
    addButton.addEventListener('click', () => {
        const newCategory = prompt('Enter a new category:');
        if (newCategory) {
        categories.push(newCategory);
        updateCategoriesList(categories);
        // Perform additional actions when a new item is added
        }
        });

        // Append the add button to the container
        document.getElementById('categories-container').appendChild(addButton);
    
    const button = document.createElement("button");
    button.innerHTML = "Save"
    button.id = "save-button";
    document.getElementById("single-blog").appendChild(button);

    button.addEventListener("click", () => {
        editor.save().then((outputData) => {
        console.log('Article data: ', outputData)

        published = document.getElementById("published").checked;

        const updateData = {
            userId: userId,
            blogContent: outputData,
            categories: categories,
            public: published,
            blogId: blogId
        }
        axios.patch("http://localhost:3500/blog", updateData)
        .then((response) => {
            console.log(response.data)
            alert("updated blog")
        })
        .catch((err) => {
            console.error(err)
        })

        }).catch((error) => {
        console.log('Saving failed: ', error)
        });
    })

    document.getElementById("delete-button").addEventListener("click", () => {
        // Show the modal
        document.getElementById("deleteModal").style.display = "block";
    });
    
    document.getElementById("cancelDelete").addEventListener("click", () => {
        // Hide the modal when "No" is clicked
        document.getElementById("deleteModal").style.display = "none";
    });
    
    document.getElementById("confirmDelete").addEventListener("click", () => {
        // Perform the delete action when "Yes" is clicked
        // Add your delete logic here
        deleteBlog(blogId);
        console.log("Blog deleted!");
        
        // Hide the modal
        document.getElementById("deleteModal").style.display = "none";
    });

    console.log("editorjs")
}

async function deleteBlog(blogId) {
    const data = {
        blogId: blogId
    }
    await axios.post("http://localhost:3500/blog/delete", data)
    .then((response) => {
        console.log(response.data)
        window.location.replace("/blog/")
    })
    .catch((error) => {
        console.error(error);
    })
}


async function generateOtherInformationSection() {
    /*
    <div id="other-information">
        <p>Categories</p>
        <div id="categories-container">
            <ul id="categories">

            </ul>
        </div>
        <label for="published">Publish:</label>
        <input type="checkbox" id="published">
    </div>
    */
   const div = document.createElement("div");
   div.id = "other-information";
   const p = document.createElement("p");
   p.innerText = "Categories";
   div.appendChild(p);
   const catDiv = document.createElement("div");
   catDiv.id = "categories-container";
   const ul = document.createElement("ul");
   ul.id = "categories";
   catDiv.appendChild(ul);
   div.appendChild(catDiv);
   const label = document.createElement("label");
   label.for = "published";
   label.innerHTML = "Publish: "
   div.appendChild(label);
   const input = document.createElement("input");
   input.type = "checkbox";
   input.id = "published";
   div.appendChild(input)

   const deleteButton = document.createElement("button");
   deleteButton.id = "delete-button";
   deleteButton.innerHTML = "Delete";
   div.appendChild(deleteButton);

    document.querySelector("body").appendChild(div)
}


const createListItem = (category) => {
    const listItem = document.createElement('li');
    listItem.textContent = category;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
        // Remove the list item when the delete button is clicked
        listItem.remove();
        // Perform additional actions when an item is deleted
        handleListChange();
    });

    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    return listItem;
};

const updateCategoriesList = (categories) => {
    const categoriesList = document.getElementById('categories');
    
    // Clear the existing list
    categoriesList.innerHTML = '';

    // Create list items for each category
    categories.forEach((category) => {
        const listItem = createListItem(category);
        categoriesList.appendChild(listItem);
    });
};
    

function generateUserUI(blog) {
    const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
        header: {
            class: Header,
            config: {
            placeholder: 'Enter a header',
            levels: [2, 3, 4],
            defaultLevel: 3
            }
        },
        raw: RawTool,
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
            captionPlaceHolder: "Quote\'s author"
            },
        },
        },
        data: blog.blogContent,
        readOnly: true
    });
    const p = document.createElement("p");
    p.innerText = blog.categories.join(" : ");
    document.getElementById("single-blog").appendChild(p);
}