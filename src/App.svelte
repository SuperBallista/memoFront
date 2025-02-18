<script lang="ts">
    import "../src/app.css";
    import Login from "./components/pages/Login.svelte";
    import Main from "./components/pages/Main.svelte";
    import BoxOverlay from "./lib/custom/BoxOverlay.svelte";
    import  { username }  from "./lib/store/userStore"


    if (localStorage.getItem("guest") === "true")
{
 username.set("guest")
}


</script>
<BoxOverlay/>
{#if $username!==""}
<Main/>
{:else}
<Login/>
{/if}