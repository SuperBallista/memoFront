<script lang="ts">
    import { isSidebarOpened } from "@lib/store/viewStore";
    import DesktopNav from "./DesktopNav.svelte";
    import MobileNav from "./MobileNav.svelte";

    let isSearchOpen = false;
  
    function toggleSearch() {
      isSearchOpen = !isSearchOpen;
    }
  </script>
  
  <!-- 전체 UI -->
  <div class="fixed z-10">
  
    <!-- 모바일 메뉴 및 검색 버튼 -->
    <div class="lg:hidden fixed top-4 right-4 flex space-x-4">
      <button 
        class="cursor-pointer p-2 bg-card text-default rounded-full shadow-md hover:bg-sub1 transition"
        on:click={toggleSearch}
      >
        <img src="./icons/search.svg" alt="Search Icon" class="w-6 h-6" />
      </button>
      <button 
        class="cursor-pointer p-2 bg-card text-default rounded-full shadow-md hover:bg-sub1 transition"
        on:click={() => isSidebarOpened.set(!$isSidebarOpened)}
      >
        <img src="./icons/menu.svg" alt="Menu Icon" class="w-6 h-6" />
      </button>
      <MobileNav/>
    </div>
  
    <!-- 모바일 검색 UI -->
    <div class="absolute top-1 left-3 lg:hidden">
      {#if isSearchOpen}
        <div class="mt-3 w-56">
          <input 
            type="text" 
            placeholder="메모 및 도구 찾기..." 
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main bg-light text-default"
          />
        </div>
      {/if}
    </div>
        <!-- PC 화면에서는 앱 이름과 검색바 항상 보이도록 -->
          <div class="fixed hidden lg:flex justify-between items-center p-4 bg-main text-white shadow-md w-full">
      <h1 class="text-2xl font-bold">디지털 교무 수첩</h1>
  
      <!-- PC 화면에서 검색바 항상 보이도록 -->
      <div class="flex items-center space-x-2">
        <input 
          type="text" 
          placeholder="메모 및 도구 찾기..." 
          class="w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main bg-light text-default"
        />
      <DesktopNav/>
    </div>
    </div>
  </div>

  <style>
    @media (max-width: 640px) {
      /* 모바일 화면에서만 검색 아이콘과 메뉴 아이콘이 보이도록 설정 */
      .lg\:hidden { display: block !important; }
      .lg\:flex { display: none !important; }
    }
  </style>
  