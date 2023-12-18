import '../style.css'


const userId = sessionStorage.getItem("userId");
const blogId = sessionStorage.getItem("singleBlogId");

if (userId && blogId) {
    // admin 
    alert('you are admin')
} else if (!userId && blogId) {
    // normal reader
    alert('you are a normal reader');
} else {
    window.location.replace("/blog/");
}
