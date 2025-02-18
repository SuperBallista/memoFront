<script lang="ts">
    import { moveToPage } from "@lib/store/viewStore";
export let memo

</script>


<button
on:click={() => moveToPage("memo", memo.id)}
class="cursor-pointer flex justify-between items-center bg-card p-4 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg text-default no-underline"
>
<div class="flex flex-col gap-1">
  <h3 class="text-base font-semibold text-default">{memo.title}</h3>
  <p class="text-sm text-muted">{memo.content}</p>
</div>
<span class="text-xs text-muted">{memo.dateTimeLink}</span>
</button>
