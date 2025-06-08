import { defineConfig } from "vite";
// ceshi
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { codeInspectorPlugin } from "code-inspector-plugin";
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    codeInspectorPlugin({
      bundler: "vite",
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 配置 @ 指向 src 目录
    },
  },
  server: {
    port: "5000",
    proxy: {
      '/tianditu': {
        target: 'http://t0.tianditu.gov.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tianditu/, ''),
      },
      '/cesium': {
        target: 'https://assets.ion.cesium.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cesium/, ''),
      },
      // 保留原有的代理配置
      "/foo": "http://localhost:4567",
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  /*主要看下面这段*/
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "@/styles/constant.scss";',
      },
    },
  },
});
