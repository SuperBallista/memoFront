<script lang="ts">
  import MemoItemPC from "./MemoItemPC.svelte";  // ✅ PC용 경로 확인
  import MemoItemMobile from "./MemoItemMobile.svelte";  // ✅ 모바일용 경로 확인
    import { writable } from "svelte/store";
    import type { memoType } from "@lib/types/memoTypes";

  export let memo: memoType;
  export let dateNumber: number;

  const isMobile = writable<boolean>(false);

  isMobile.set(window.innerWidth < 1024); // `lg:` 기준
</script>

{#if $isMobile}
 <MemoItemMobile {memo} {dateNumber} />

{:else}
  <MemoItemPC {memo} {dateNumber} />
{/if}


