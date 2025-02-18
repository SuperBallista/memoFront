<script lang="ts">
  import type { kindType, sectionInterface } from "@lib/store/settingStore";
    import MemoSummaryCard from "./parts/category/MemoSummaryCard.svelte";

  export let list: sectionInterface[];
  export let kind: kindType;
  let memoListText:string;

  if (kind === "before") {
    memoListText = "지난 메모";
  } else if (kind === "after") {
    memoListText = "다가오는 메모";
  } else if (kind === "recentViews") {
    memoListText = "최근 본 메모";
  } else {
    memoListText = kind;
  }

</script>

<div class="w-full max-w-2xl mx-auto p-5 font-pretendard">
  <h2 class="text-xl font-semibold mb-4 text-sub1">📌 {memoListText}</h2>

  <!-- 📌 PC에서는 2개씩 배치, 모바일에서는 1개씩 -->
  <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
    {#each list as memo}
    <MemoSummaryCard memo={memo}/>
    {/each}
  </div>
</div>
