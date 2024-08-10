import axios from "axios";

const url = 'https://altaiblogbackend.onrender.com';

export async function checkMe(password: any) {
    try {
        const response = await axios.post(`${url}/auth/checkme`, { password });
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking password:', error);
        return false;
    }
}


export async function getBlogs() {
    try {
        const response = await axios.get(`${url}/blog`);
        return response.data;
    } catch (error) {
        console.error('Error getting blogs:', error);
        throw error;
    }
}

export async function createBlog(content: any) {
    try {
        const response = await axios.post(`${url}/blog`, {content}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
}

export async function getSingleBlog(blogId: any) {
    try {
        const response = await axios.get(`${url}/blog/${blogId}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting blog with ID ${blogId}:`, error);
        throw error;
    }
}

export async function updateBlog(blogId: string, content: any) {
    try {
        const updateObject = {
            blogId,
            content
        }
        const response = await axios.put(`${url}/blog/`, updateObject, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
}

export async function deleteBlog(blogId: any) {
    try {
        const response = await axios.post(`${url}/blog/delete`,{blogId}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}