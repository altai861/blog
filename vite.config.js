import { defineConfig } from 'vite';
import { resolve } from "path";


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login/index.html'),
        createblog: resolve(__dirname, 'createBlog/index.html'),
        singleblog: resolve(__dirname, 'singleBlog/index.html')
      }
    }
  },
  base: '/blog/'
});