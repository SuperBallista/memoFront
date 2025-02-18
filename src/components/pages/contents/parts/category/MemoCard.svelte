<script lang="ts">
    import { onMount } from "svelte";
    import { moveToPage } from "@lib/store/viewStore";
    import type { memoType } from "@lib/types/memoTypes";

export let memo:memoType
let isMobile = false; // 모바일 여부 감지

// 반응형으로 모바일 상태 감지
const checkMobile = () => {
  isMobile = window.innerWidth < 768;
};

onMount(() => {
  checkMobile(); // 초기 로드 시 확인
  window.addEventListener("resize", checkMobile); // 창 크기 변경 감지
});

// 모바일/PC에 따라 다른 길이로 내용 자르기
const truncateContent = (content: string) => {
  let truncated = isMobile ? content.slice(0, 100) : content.slice(0, 350); // 모바일: 100자, PC: 350자
  return isMobile ? truncated + "..." : truncated.replace(/\n/g, "<br>") + "..."; // 모바일에서는 <br> 제거
};

</script>


<div class="transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer bg-card p-4 md:p-5 bg-cardBg shadow-md rounded-lg flex flex-col"
on:click={() => moveToPage("memo",memo.id)}>
    <h3 class="font-semibold text-lg md:text-2xl text-sub1">{memo.title}</h3>
    <p class="text-default text-sm md:text-lg overflow-hidden content-text">
      {@html truncateContent(memo.content)}
    </p>
  </div>


  <style>
  /* 모바일: 최대 4줄 표시 */
  @media (max-width: 768px) {
    .content-text {
      -webkit-line-clamp: 3;
      max-height: 5.5em; /* 폰트 크기에 따라 적절한 높이 조정 */
    }
  }

  /* PC: 8줄 표시 */
  @media (min-width: 769px) {
    .content-text {
      -webkit-line-clamp: 8;
      max-height: 11em;
    }
  }

  .content-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }



  </style>