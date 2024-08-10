import { defineConfig } from "vite";
import { resolve } from "path"

export default defineConfig({
    base: "/blog/",
    build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html')
          }
        }
    },
})