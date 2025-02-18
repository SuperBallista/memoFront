import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { mount } from 'svelte';
import App from '@svelteSrc/App.svelte';

const initCapacitor = async () => {
    try {
        if (Capacitor.isNativePlatform()) {
            await SplashScreen.hide(); // ✅ 스플래시 화면 숨기기
        }
    } catch (error) {
        console.error("❌ Capacitor 초기화 실패:", error);
    }
};

const startApp = async () => {
    await initCapacitor();

    mount(App, {
        target: document.getElementById('app')!,
    });
};

startApp();
