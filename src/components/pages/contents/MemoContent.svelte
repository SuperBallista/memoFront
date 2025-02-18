<script lang="ts">
  import MemoToolbar from "./parts/memo/MemoToolbar.svelte";
  import MemoLinks from "./parts/memo/MemoLinks.svelte";
  import { currentLine, viewMemoCard } from "@lib/store/memoStore";
  import { mainColor, view } from "@lib/store/viewStore";
    import { findDateFromString } from "@lib/utils/findDateFromString";
    import { showMessageBox } from "@lib/custom/customStore";
    import { formatDate, formatDateString } from "@lib/utils/formatDate";
    import Main from "../Main.svelte";


  const handleContentChange = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  const newText = textarea.value;

  // 전체 메모 내용 업데이트
  viewMemoCard.update(memo => ({ ...memo, content: newText }));

  // 현재 입력 중인 줄 감지
  const cursorPosition = textarea.selectionStart;
  const lines = newText.split("\n");
  let currentRow = 0, charCount = 0;
  let currentTextLine = "";

  for (const line of lines) {
    if (charCount + line.length >= cursorPosition) {
      currentTextLine = line;
      currentLine.set(line); // 현재 줄 업데이트
      break;
    }
    charCount += line.length + 1; // +1은 줄바꿈 문자 고려
    currentRow++;
  }
  if (currentTextLine.trim().endsWith("%%")) {
    callFunction()
  }
};


async function callFunction(){ 
  const memoDateLog =  findDateFromString($currentLine)
  console.log(memoDateLog)
  if (memoDateLog)
{
  try{
  const userResponse = await showMessageBox("input",
 "날짜 시간 기록",
 formatDateString(memoDateLog.resultDate,"YYYY.MM.DD HH:mm") + "를 메모하시겠습니까?",
  mainColor,
  [{key:"date",label:"날짜시간", type: "datetime-local", value:formatDateString(memoDateLog.resultDate,"YYYY-MM-DDTHH:mm")}])
if (userResponse.success) {

  viewMemoCard.update(card => {
  return {
    ...card,
    dateTimeLink: [...card.dateTimeLink, memoDateLog.resultDate] // 🔥 새로운 배열로 업데이트
  };
});

console.log($viewMemoCard.dateTimeLink)

}

 }
catch (error){
showMessageBox("error", "오류 발생", "오류 발생 : " + error,mainColor)
}
finally {
  currentLine.set($currentLine.replace("%%",""))
  viewMemoCard.update(memo => ({ ...memo, content: $viewMemoCard.content.replace("%%","") }));
}
}
  }


</script>

<div class="bg-bgPrimary flex items-center justify-center p-6">
  <div class="max-w-5xl w-full bg-cardBg shadow-lg rounded-lg p-8 flex flex-col gap-6">
    
    <!-- 제목 -->
    <h1 class="text-3xl font-bold text-main mb-4">{$viewMemoCard.title}</h1>

    <!-- 본문 수정 가능 (textarea) -->
    <textarea
      class="w-full text-default text-lg border border-sub1 rounded-md p-3 min-h-[450px] resize-none"
      bind:value={$viewMemoCard.content}
      on:input={handleContentChange}
      rows="10"
    ></textarea>

    <!-- 보조 기능: 카테고리 선택 & 파일 첨부 -->
    <MemoToolbar />

    <!-- 날짜, 학생, 메모 링크 -->
    <MemoLinks />

    <!-- 나가기 버튼 -->
    <button on:click={() => view.undo()} class="cursor-pointer mt-8 w-full py-3 text-center btn-gray text-white font-semibold rounded-lg shadow-md">
      나가기
    </button>
  </div>
</div>
