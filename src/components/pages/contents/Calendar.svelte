<script lang="ts">
  import { onMount } from "svelte";
  import CalendarDays from "./parts/calendar/CalendarDays.svelte";
    import { moveToPage, viewMonthYearWeek } from "@lib/store/viewStore";

  let currentDate = new Date();
  let weeks: (Date | null)[][] = []; // 주 단위로 날짜 저장
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let hoveredWeek: number | null = null; // 마우스 오버된 주 인덱스

  function getDaysInMonth(year: number, month: number) {
    let date = new Date(year, month, 1);
    let days: (Date | null)[] = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  function generateCalendar() {
  let days = getDaysInMonth(year, month);
  const firstDayIndex = days[0]?.getDay() ?? 0;
  const lastDayIndex = days[days.length - 1]?.getDay() ?? 6;

  // ✅ `month - 1`이 음수가 되지 않도록 처리
  let prevYear = month === 0 ? year - 1 : year;
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevMonthDays = getDaysInMonth(prevYear, prevMonth);

  let nextYear = month === 11 ? year + 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextMonthDays = getDaysInMonth(nextYear, nextMonth);

  // ✅ 이전 달 날짜 추가 (오류 방지)
  let prevDaysToAdd = [];
  const startIdx = prevMonthDays.length - firstDayIndex;
  for (let i = 0; i < firstDayIndex; i++) {
    if (prevMonthDays[startIdx + i] !== undefined) {
      prevDaysToAdd.push(prevMonthDays[startIdx + i]);
    }
  }
  days = [...prevDaysToAdd, ...days];

  // ✅ 다음 달 날짜 추가 (오류 방지)
  let nextDaysToAdd = [];
  for (let i = lastDayIndex + 1; i < 7; i++) {
    if (nextMonthDays[i - (lastDayIndex + 1)] !== undefined) {
      nextDaysToAdd.push(nextMonthDays[i - (lastDayIndex + 1)]);
    }
  }
  days = [...days, ...nextDaysToAdd];

  weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
}


  function prevMonth() {
    if (month === 0) {
      month = 11;
      year--;
    } else {
      month--;
    }
    hoveredWeek = null;
    generateCalendar();

  }

  function nextMonth() {
    if (month === 11) {
      month = 0;
      year++;
    } else {
      month++;
    }
    hoveredWeek = null;
    generateCalendar();
  }

  function handleMouseOver(index: number) {
    hoveredWeek = index;
  }

  function handleMouseLeave() {
    hoveredWeek = null;
  }

  onMount(() => {
    generateCalendar();
  });
</script>

<div class="w-full h-screen flex flex-col items-center bg-light p-6">
  <div class="w-full max-w-screen-lg bg-white rounded-lg shadow-lg p-6 md:p-10 flex flex-col h-auto">
    <!-- 달력 헤더 -->
    <div class="flex justify-between items-center mb-6">
      <button class="cursor-pointer btn-gray px-6 py-3 text-2xl rounded" on:click={prevMonth}>‹</button>
      <h2 class="text-3xl font-bold text-main">{year}년 {month + 1}월</h2>
      <button class="cursor-pointer btn-gray px-6 py-3 text-2xl rounded" on:click={nextMonth}>›</button>
    </div>

    <!-- 요일 헤더 (모바일 7열 / 데스크톱 8열) -->
    <div class="grid grid-cols-7 md:grid-cols-8 text-center text-muted font-semibold text-lg border-b-2 pb-2">
      <div class="hidden md:block"></div> <!-- 주 버튼 자리 (모바일에서는 숨김) -->
      <div class="text-accent">일</div>
      <div>월</div>
      <div>화</div>
      <div>수</div>
      <div>목</div>
      <div>금</div>
      <div class="text-sub1">토</div>
    </div>

    <!-- 주별 버튼 + 날짜 -->
    <div class="flex flex-col mt-4 flex-1">
      {#each weeks as week, index}

      <div class="md:hidden flex justify-right w-full mb-1">
    <button 
      class="w-5 h-5 bg-button text-white text-xs rounded-md transition-all hover:bg-accent"
      on:touchstart={() => handleMouseOver(index)}
      on:blur={handleMouseLeave}
      on:click={() => {moveToPage("week",week[0].getDate());
      viewMonthYearWeek.set({month: week[0].getMonth(), year:week[0].getFullYear(),week:index})}}

    >
      ▼
    </button>
  </div>
        <div class="grid grid-cols-7 md:grid-cols-8 items-center gap-1 md:gap-2 rounded-md transition-all duration-200 {hoveredWeek === index ? 'border-2 border-gray' : 'border-transparent'}">
          <!-- 데스크톱 전용 주별 버튼 (왼쪽) -->
          <button 
            class="hidden md:flex cursor-pointer w-5 h-5 bg-button text-white text-xs rounded-md transition-all 
                   hover:bg-accent items-center justify-center"
                   on:mouseover={() => handleMouseOver(index)}
                   on:mouseleave={handleMouseLeave}         
                   on:click={() => {moveToPage("week",week[0].getDate());
                   viewMonthYearWeek.set({month: week[0].getMonth(), year:week[0].getFullYear(),week:index})
}}
       >
          ▶
          </button>

          <!-- 날짜 (7열) -->
          {#each week as day}
            <CalendarDays day={day}/>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
