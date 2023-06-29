// vite.config.ts
import path from "path";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";

const proxy_target = "http://localhost:8080";
const contexts = [
  "/plc_config",
  "/run_task",
  "/plc_configs",
  "/createDataTable",
];
const proxy = {};
for (let context of contexts) {
  proxy[context] = {
    target: proxy_target,
    changeOrigin: true,
    pathRewrite: { [`^${context}`]: "" },
  };
}

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      // 设置路径
      "~": path.resolve(__dirname, "./"),
      // 设置别名
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  esbuild: {
    // 打包去除console和debugger
    drop: ["console", "debugger"],
  },
  plugins: [
    // 打包体积视图分析
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "test.html", //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
    vue(),
    // element ui自动引入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // node服务
  server: {
    host: true,
    open: true,
    hmr: true, // 热更新
    proxy, // 配置代理
  },
});
