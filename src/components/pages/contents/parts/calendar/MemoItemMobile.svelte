<script lang="ts">
  import { moveToPage } from "@lib/store/viewStore";
    import type { memoType } from "@lib/types/memoTypes";
  import { formatDateString } from "@lib/utils/formatDate";

  export let memo: memoType;
  export let dateNumber: number;

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
  class="w-1/4 cursor-pointer flex flex-row items-center justify-between bg-card px-2 py-2 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5 text-main"
>
  <div class="flex-1 truncate">
    <div class="text-sm font-semibold text-main truncate">{memo.title || "제목 없음"}</div>
    <div class="text-sm font-semibold text-default w-full truncate">{memo.content}</div>
    <div class="text-xs text-muted">{checkAt}</div>
  </div>
</button>
