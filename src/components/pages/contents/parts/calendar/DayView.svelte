<script lang="ts">
    import MemoItem from "./MemoItem.svelte";
    import defaultMemoCategory from "../../../../../defaultData/defaultCategoryContent.json"
    import type { memoType } from "@lib/types/memoTypes";
  
    export let dateNumber:number;
    export let day: string;
  
    let memos:memoType[] = defaultMemoCategory as unknown as memoType[]



  </script>
  
  <div class="rounded-md">
    <h3 class="text-lg font-semibold text-sub1 mb-2">({dateNumber}일 {day}요일)</h3>
  
    <div class="max-w-screen flex flex-wrap flex-row lg:flex-col gap-1">
      {#each memos as memo}
        <MemoItem memo={memo} dateNumber={dateNumber} />
      {/each}
    </div>

  </div>
  