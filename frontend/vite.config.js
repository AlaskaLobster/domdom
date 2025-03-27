import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'; // Thêm plugin JSX


export default defineConfig({
  plugins: [vue(), vueJsx()], // Thêm vueJsx vào danh sách plugin

  server: {
    port: 3000, // Set the desired port here
  },
});
