<script>

    import { moveToPage } from "@lib/store/viewStore";

</script>
<div class="fixed bottom-0 left-0 w-full bg-white shadow-md p-2 border-t flex justify-around">
    <button  on:click={() => {moveToPage("calendar",0)}} class="cursor-pointer flex flex-col items-center text-gray-700 hover:text-main transition">
      📅 <span class="text-xs">달력</span>
    </button>
    <button class="cursor-pointer flex flex-col items-center text-gray-700 hover:text-main transition">
      🎓 <span class="text-xs">학생</span>
    </button>
    <button class="cursor-pointer flex flex-col items-center text-gray-700 hover:text-main transition">
      🔧 <span class="text-xs">도구</span>
    </button>
    <button class="cursor-pointer flex flex-col items-center text-gray-700 hover:text-main transition">
      ⚙️ <span class="text-xs">설정</span>
    </button>
  </div>
  