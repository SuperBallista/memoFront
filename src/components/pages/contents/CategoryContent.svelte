<script lang="ts">
  import defaultCategoryContent from "../../../defaultData/defaultCategoryContent.json";
  import { viewCategoryName } from "@lib/store/viewStore";
    import MemoCard from "./parts/category/MemoCard.svelte";

  let memoes = defaultCategoryContent.map(memo => ({
    ...memo,
    dateTimeLink: memo.dateTimeLink.map((date: string) => new Date(date)), // 문자열 → Date 변환
  }));
</script>

<div class="p-8 bg-bgPrimary">
  <!-- 카테고리 제목 -->
  <h2 class="text-xl md:text-4xl font-bold text-main mb-6 text-center">{$viewCategoryName}</h2>

  <!-- 카드 섹션 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {#each memoes as memo}
      <MemoCard memo={memo}/>
    {/each}
  </div>
</div>
