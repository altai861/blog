import axios, { AxiosRequestConfig } from "axios";

const url = 'http://localhost:3500';

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

export async function updateBlog(updateObject: any) {
    try {
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

export async function deleteBlog(deleteObject: any) {
    try {
        const response = await axios.delete(`${url}/blog/delete`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: deleteObject // Pass deleteObject in the data property
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}