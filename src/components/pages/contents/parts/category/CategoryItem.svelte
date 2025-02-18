<script context="module">
  import { selectedCategoryId, view, viewCategoryId, viewCategoryName } from "@lib/store/viewStore";
  import CategoryItem from "./CategoryItem.svelte"; // ✅ 자기 자신을 import
</script>

<script lang="ts">
  import { writable } from "svelte/store";

  export let item;
  export let addSubCategory: (parentId: number) => void;
  export let removeCategory: (id: number) => void;
  export let moveCategory: (parentId: number, orderNum: number) => void;
  export let updateCategoryName: (id: number, newName: string) => void; // ✅ 카테고리명 업데이트 함수 추가

  let isEditing = writable(false);
  let editedName = writable(item.name);

  async function openClick() {
    if ($selectedCategoryId === item.id) {
      if ($viewCategoryId === item.id) {
        isEditing.set(true);
      } else {
        viewCategoryId.set(item.id);
        viewCategoryName.set(item.name);
        view.set("category")
      }
    } else {
      selectedCategoryId.set(item.id);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      updateCategoryName(item.id, $editedName);
      isEditing.set(false);
    } else if (event.key === "Escape") {
      isEditing.set(false);
      editedName.set(item.name);
    }
  }
</script>

<li class="flex flex-col space-y-1">
  <div class="flex justify-between items-center">
      <!-- 📌 선택된 카테고리일 경우 글자색 변경 -->
      <button 
        on:click={() => openClick()} 
        class="cursor-pointer flex items-center rounded-lg hover:bg-sub1 transition p-2 
        {($selectedCategoryId === item.id) ? 'text-main' : 'text-default'}"
      >
          📁 
          {#if $isEditing}
            <input 
              bind:value={$editedName}
              class="ml-2 w-auto min-w-[80px] max-w-[120px] text-sm bg-transparent border border-gray-400 rounded px-1"
              on:keydown={handleKeyDown}
              on:blur={() => isEditing.set(false)}
              autofocus
            />
          {:else}
            <span class="ml-2">{item.name}</span>
          {/if}
      </button>

      {#if $selectedCategoryId === item.id}
      <div class="flex space-x-2">
          <button on:click={() => addSubCategory(item.id)} class="text-main text-sm px-2">➕</button>
          <button on:click={() => removeCategory(item.id)} class="text-accent text-sm px-2">🗑</button>
      </div>
      {/if}
  </div>

  {#if item.children && item.children.length > 0}
      <ul class="pl-4 space-y-1">
          {#each item.children as child}
              <CategoryItem 
                  moveCategory={moveCategory} 
                  addSubCategory={addSubCategory} 
                  removeCategory={removeCategory}
                  updateCategoryName={updateCategoryName} 
                  item={child} 
              />
          {/each}
      </ul>
  {/if}
</li>
