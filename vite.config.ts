import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path"; // ✅ Node.js 내장 모듈 사용
import { fileURLToPath } from "node:url"; // ✅ Vite에서 경로 변환 필요

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"),
      "@svelteSrc": path.resolve(__dirname, "../front/src")
    }
  },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, "src"), // ✅ src 폴더 추가
        path.resolve(__dirname, "node_modules") // ✅ node_modules 접근 허용
      ]
    }
  }
});
