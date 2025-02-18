<script lang="ts">
    import { allCategories, viewMemoCard } from "@lib/store/memoStore";
    let fileInputRef: HTMLInputElement | null = null;
    let attachedFiles: File[] = [];
  
    // 파일 업로드 핸들러
    const handleFileUpload = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        attachedFiles = [...attachedFiles, ...Array.from(files)];
      }
    };
  
    // 파일 선택 버튼 클릭 시 파일 선택창 열기
    const openFilePicker = () => {
      fileInputRef?.click();
    };
  
    // 카테고리 변경 핸들러
    const updateCategory = (event: Event) => {
      const newCategory = parseInt((event.target as HTMLSelectElement).value);
      viewMemoCard.update(memo => ({ ...memo, category: newCategory }));
    };
  </script>
  
  <div class="flex flex-wrap gap-4 items-center">
    <!-- 카테고리 선택 -->
    <div class="flex items-center">
      <label class="text-lg font-semibold text-sub1 mr-2">📂 카테고리:</label>
      <select bind:value={$viewMemoCard.category} on:change={updateCategory} class="border rounded-md p-2">
        {#each $allCategories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </select>
    </div>
  
    <!-- 파일 첨부 버튼 -->
    <div class="flex items-center">
      <button on:click={openFilePicker} class="cursor-pointer btn-gray p-2 rounded text-sm">
        📎 파일 추가
      </button>
      <input type="file" multiple on:change={handleFileUpload} class="hidden" bind:this={fileInputRef} />
      
      <!-- 첨부된 파일 개수만 표시 -->
      {#if attachedFiles.length > 0}
        <span class="text-sm text-default ml-2">({attachedFiles.length}개 파일 첨부됨)</span>
      {/if}
    </div>
  </div>
  