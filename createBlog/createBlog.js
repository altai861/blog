import './createBlog.css'
import axios from 'axios'
import EditorJS from '@editorjs/editorjs';
import Header from "@editorjs/header"
import RawTool from '@editorjs/raw'
import SimpleImage from "@editorjs/simple-image"
import Checklist from "@editorjs/checklist"
import List from "@editorjs/list"
import Embed from "@editorjs/embed"
import Quote from "@editorjs/quote"

let userId = sessionStorage.getItem("userId");

document.addEventListener("DOMContentLoaded", () => {
    if (userId) {
      createNewBlog();
    } else {
        window.location.replace("/");
    }
    
})

async function createNewBlog() {
  const postdata = {
    userId: userId
  }
  await axios.post("https://altaiblogbackend.onrender.com/blog", postdata)
  .then((response) => {
    console.log(response.data)
    initializeEditor(response.data);

  })
  .catch((err) => {
    console.error(err.message)
    return
  })
}

async function initializeEditor(newBlog) {

  const saveButton = document.getElementById("save-button")

  let categories = newBlog.categories
  let published = newBlog.public
  let blogContent = newBlog.blogContent
  let blogId = newBlog._id

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
  console.log(newBlog.blogContent)


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


  saveButton.addEventListener("click", () => {
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
      axios.patch("https://altaiblogbackend.onrender.com/blog", updateData)
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
  console.log("editorjs")
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