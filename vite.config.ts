import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path"; // ✅ Node.js 내장 모듈 사용
import { fileURLToPath } from "node:url"; // ✅ Vite에서 경로 변환 필요
import tailwindcss from '@tailwindcss/vite';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [     tailwindcss(),
    svelte()],
    base: "./",
    resolve: {
      alias: {
        "@lib": path.resolve(__dirname, "src/lib"),
      }
    },
    build: {
      target: "es2015", // ✅ ES6+ 호환 빌드
    },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, "src"), // ✅ src 폴더 추가
        path.resolve(__dirname, "node_modules/pretendard"), // ✅ Pretendard 폰트 폴더 허용
        path.resolve(__dirname, "public"), // ✅ public 폴더 허용
      ],
    },
  },
});
