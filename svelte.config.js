import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    paths: {
      base: './'  // 🔥 중요: Electron에서 상대 경로 사용 가능하게 설정
    }
  }
};
