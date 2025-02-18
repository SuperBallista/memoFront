<script lang="ts">
    import { moveToPage } from "@lib/store/viewStore";
    import type { memoType } from "@lib/types/memoTypes";
    import { formatDateString } from "@lib/utils/formatDate";
  
    export let memo: memoType;
    export let dateNumber: number;
  
    // 기본값 (시간이 없으면 체크 표시)
    let checkAt: string = "✔️";
  
    if (Array.isArray(memo.dateTimeLink) && memo.dateTimeLink.length > 0) {
      const matchedDate = memo.dateTimeLink.find(dateString => {
        const dateObj = new Date(dateString);
        return dateObj.getDate() === dateNumber;
      });
  
      if (matchedDate) {
        const timeObj = new Date(matchedDate);
        checkAt = formatDateString(timeObj, "HH:mm");
      }
    }
  </script>
  
  <button
    on:click={() => moveToPage("memo", memo.id)}
    class="cursor-pointer flex flex-col justify-between bg-card px-3 py-2 rounded-md shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-0.5 text-main w-full min-h-[140px]"
  >
    <div class="text-md font-semibold text-main truncate w-full">
      {memo.title || "제목 없음"}
    </div>
  
    <div class="text-sm font-semibold text-default w-full line-clamp-4">
      {memo.content}
    </div>
  
    <span class="text-xs text-muted">{checkAt}</span>
  </button>
  