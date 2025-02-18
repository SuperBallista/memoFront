<!-- 📌 PC 네비게이션 (검색창 오른쪽) -->
<div class="nav-container">
  <button class="nav-btn" on:click={() => {moveToPage("calendar",0)}} data-tooltip="달력">📅</button>
  <button class="nav-btn" data-tooltip="학생">🎓</button>
  <button class="nav-btn" data-tooltip="도구">🔧</button>
  <button class="nav-btn" data-tooltip="설정">⚙️</button>
</div>

<script lang="ts">
    import { moveToPage } from "@lib/store/viewStore";




</script>



<style>

/* 버튼 hover 효과 */
.nav-btn:hover {
  color: var(--sub1, #3B82F6);
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 네비게이션 컨테이너: 버튼을 가로로 정렬 */
.nav-container {
  display: flex;
  gap: 10px; /* 버튼 간격 */
}

/* 버튼 스타일 */
.nav-btn {
  position: relative; /* 툴팁의 기준점 */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 1.5rem;
}

/* 툴팁 스타일 */
.nav-btn::before {
  content: attr(data-tooltip); /* data-tooltip 속성 값 사용 */
  position: absolute;
  bottom: -50%; /* 버튼 위쪽에 표시 */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 1rem;
  white-space: nowrap;
  display: block;
  visibility: hidden;
  opacity: 0;
  z-index: 1000; /* 다른 요소 위에 표시 */
  pointer-events: none; /* 툴팁에 마우스 이벤트가 전달되지 않도록 설정 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}


/* 마우스를 올리면 즉시 툴팁 표시 */
.nav-btn:hover::before,
.nav-btn:hover::after {
  visibility: visible;
  opacity: 1;
}
</style>