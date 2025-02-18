<script lang="ts">
    import { username } from "@lib/store/userStore";
  
    function loginWithGoogle() {}
    function loginWithKakao() {}
    function loginWithApple() {}
  
    function useGuestMode() {
      localStorage.setItem("guest", "true");
      username.set("guest");
    }
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-light px-4">
    <div class="bg-card shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h1 class="text-2xl font-semibold text-default text-center mb-6">디지털 교무 수첩</h1>
  
        <!-- 버튼 간 여백 추가 (space-y-4) -->
        <div class="flex flex-col items-center space-y-4">
  
            <button 
                class="cursor-pointer flex items-center justify-center w-80 h-12 rounded-xl bg-[#fee500] text-[#3c1e1e] font-medium shadow-sm hover:bg-[#fdd835] transition"
                on:click={loginWithKakao}
            >
                <img src="./icons/kakao.svg" alt="Kakao Logo" class="w-6 h-6" />
                <span class="ml-3">Kakao 로그인</span>
            </button>
  
            <button 
                class="cursor-pointer flex items-center justify-center w-80 h-12 rounded-xl bg-white text-default font-medium shadow-sm border border-gray-300 hover:bg-gray-100 transition"
                on:click={loginWithGoogle}
            >
                <img src="./icons/google.svg" alt="Google Logo" class="w-6 h-6" />
                <span class="ml-3">Google 로그인</span>
            </button>
        
            <button 
                class="cursor-pointer flex items-center justify-center w-80 h-12 rounded-xl bg-black text-white font-medium shadow-sm hover:bg-gray-900 transition"
                on:click={loginWithApple}
            >
                <img src="./icons/apple.svg" alt="Apple Logo" class="w-6 h-6" />
                <span class="ml-3">Apple 로그인</span>
            </button>
        
            <button 
                class="cursor-pointer flex items-center justify-center w-80 h-12 rounded-xl bg-main text-white font-medium shadow-sm hover:bg-sub1 transition"
                on:click={useGuestMode}
            >
                🚀 비로그인 이용
            </button>
  
        </div>
    </div>
  </div>
  