<script lang="ts">

    import { view } from "@lib/store/viewStore";
    import MemoSummary from "./contents/MemoSummary.svelte";
    import Sidebar from "../layout/Sidebar.svelte";
    import defaultMemoSummary from "../../defaultData/defaultMemoSummary.json";
    import HeaderSearch from "../layout/HeaderSearch.svelte";
    import { sectionList } from "@lib/store/settingStore";
   import type  {sectionListInterface} from "@lib/store/settingStore"
   import CategorySummary from "./contents/CategoryContent.svelte";
    import MemoContent from "./contents/MemoContent.svelte";
    import Calendar from "./contents/Calendar.svelte";
    import WeekView from "./contents/WeekView.svelte";
    import { viewMemoCard } from "@lib/store/memoStore";
    import defaultMemoText from "../../defaultData/defaultMemoText.json"
    import type { memoType } from "@lib/types/memoTypes";

    viewMemoCard.set(defaultMemoText as unknown as memoType)

    
    sectionList.set(defaultMemoSummary as sectionListInterface[])

    const now = new Date(2025, 2, 14); // 2025년 3월 14일 (금요일)

</script>
<header>
<HeaderSearch/>
</header>

<div>
<Sidebar/>
</div>

<main class="lg:pl-64 lg:pt-16 h-screen">

    {#if $view === "summary"}
  
    <!-- 📌 Summary 제목 (가운데 정렬) -->
    <div class="lg:block hidden text-center mt-6 mb-8">
      <h1 class="text-3xl font-bold text-main">📝 내 교무 수첩 한눈에 보기</h1>
      <p class="text-muted text-lg mt-1">모든 메모를 한 곳에서 관리하세요.</p>
    </div>
  
    {#each $sectionList as section}
      <MemoSummary kind={section.kind} list={section.list} />    
    {/each}
    {:else if $view === "category"}
    <CategorySummary/>
    {:else if $view === "memo"}
    <MemoContent/>
    {:else if $view === "calendar"}
    <Calendar/>
    {:else if $view === "week"}
    <WeekView/>
    {/if}
  </main>
  