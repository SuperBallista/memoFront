<script lang="ts">
  import { viewPageNumber } from "@lib/store/viewStore";
  import DayView from "./parts/calendar/DayView.svelte";

  let days = ["일", "월", "화", "수", "목", "금", "토"];

  let weekDayList: { dateNumber: number; day: string }[] = [];
  for (let i = 0; i < 7; i++) {
      weekDayList.push({ dateNumber: $viewPageNumber + i, day: days[i] });
  }
</script>

<div class="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
  <h2 class="text-2xl font-bold text-main text-center mb-4">주간 일정</h2>

  <!-- 📌 PC에서는 grid-cols-7 (세로 진행) -->
  <div class="hidden lg:grid grid-cols-7 gap-2">
      {#each weekDayList as date}
          <DayView dateNumber={date.dateNumber} day={date.day} />
      {/each}
  </div>

  <!-- 📌 모바일에서는 가로 진행 -->
  <div class="lg:hidden grid grid-rows-7 grid-flow-col gap-2">
      {#each weekDayList as date}
          <DayView dateNumber={date.dateNumber} day={date.day} />
      {/each}
  </div>
  <br/>
  <br/>
  <br/>
</div>
