<script lang="ts">
    import { onMount } from "svelte";
    import { getModules } from "./rest";
    import type { Module } from "./rest";
    import { listen } from "./ws";
    import { fly } from "svelte/transition";

    let enabledModules: Module[] = [];

    async function updateEnabledModules() {
        enabledModules = (await getModules())
            .filter((m) => m.enabled && !m.hidden)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    onMount(async () => {
        await updateEnabledModules();
    });

    listen("toggleModule", async () => {
        await updateEnabledModules();
    });

    listen("refreshArrayList", async () => {
        await updateEnabledModules();
    });
</script>

<div class="arraylist">
    {#each enabledModules as { name } (name)}
        <div class="module" in:fly={{ x: -100, duration: 300 }} out:fly={{ x: -100, duration: 300 }}>
            {name}
        </div>
    {/each}
</div>

<style lang="scss">
    .arraylist {
        margin-left: 5px;

        position: fixed;
        left: 0;
        top: 40px;

        .module {
            font-size: 20px;
            line-height: 20px;
            color: white;
            text-shadow: black 2px 2px;
        }
    }
</style>
