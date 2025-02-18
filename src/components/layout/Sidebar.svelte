<script lang="ts">
    import { isSidebarOpened, view } from "@lib/store/viewStore.ts";
    import CategoryItem from "../pages/contents/parts/category/CategoryItem.svelte"; // MenuItem 컴포넌트 가져오기
    import defaultCategory from "../../defaultData/defaultCategory.json"
    import { myCategory } from "@lib/store/memoStore.ts";
    
    myCategory.set(defaultCategory);
  
    function closeSidebar() {
      isSidebarOpened.set(false);
    }

      // ✅ 하위 카테고리 추가 함수
  function addSubCategory(parentId: number) {
    myCategory.update(items => {
      return items.map(item => {
        if (item.id === parentId) {
          const newId = Math.max(...items.flatMap(i => i.children.map(c => c.id))) + 1;
          return {
            ...item,
            children: [...item.children, { id: newId, name: `새 하위 카테고리 ${newId}`, children: [], orderNum: item.children.length, parentId:parentId }]
          };
        }
        return item;
      });
    });
  }

  // ✅ 카테고리 삭제 함수
  function removeCategory(id: number) {
    myCategory.update(items => {
      const removeRecursive = (list: any[]) => list.filter(item => item.id !== id).map(item => ({
        ...item,
        children: removeRecursive(item.children)
      }));
      return removeRecursive(items);
    });
  }

  // ✅ 카테고리 이동 함수 (순서 변경)
  function moveCategory(parentId: number, orderNum: number) {
    myCategory.update(items => {
      return items.map(item => {
        if (item.id === parentId) {
          let newChildren = [...item.children];
          newChildren.sort((a, b) => a.orderNum - b.orderNum);
          return {
            ...item,
            children: newChildren
          };
        }
        return item;
      });
    });
  }

  async function updateCategoryName(id:number, newName: string) {
    
  }

  </script>
  
  <!-- 모바일 오버레이 -->
  {#if $isSidebarOpened}
    <div 
      class="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
      on:click={closeSidebar}
    ></div>
  {/if}
  
  <!-- 📌 PC용 사이드바 (헤더 아래 고정) -->
  <div class="fixed hidden lg:flex flex-col w-64 h-screen text-default shadow-lg top-0 left-0 bg-card text-white overflow-y-auto">
    <div class="h-24"></div>
    <div class="p-5 text-xl font-semibold cursor-pointer" on:click={()=>{view.set("summary")}}>내 메모</div>
    <nav class="flex-1 px-2 space-y-2">
      <ul>
        {#each defaultCategory as item}
          <CategoryItem item={item} moveCategory={moveCategory} addSubCategory={addSubCategory} removeCategory={removeCategory} updateCategoryName={updateCategoryName} />
        {/each}
      </ul>
    </nav>
  </div>
  
  <!-- 📌 모바일용 사이드바 (토글) -->
  <div 
    class="fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-card shadow-md transition-transform transform lg:hidden overflow-y-auto"   style="transform: translateX({$isSidebarOpened ? '0' : '-100%'});"
    >
    <div class="p-5 text-xl font-semibold text-default cursor-pointer" on:click={()=>{view.set("summary")}}>
      내 메모
    </div>
  
    <nav class="flex-1 px-2 space-y-2">
      <ul>
        {#each defaultCategory as item}
          <CategoryItem item={item} moveCategory={moveCategory} addSubCategory={addSubCategory} removeCategory={removeCategory} updateCategoryName={updateCategoryName} />
        {/each}
      </ul>
    </nav>
  </div>
  