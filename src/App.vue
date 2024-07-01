<script setup>
    import { useThemeStore } from './stores/theme';
    import KanbanColumn from './components/KanbanColumn.vue';

    const themeStore = useThemeStore()

    themeStore.init()
</script>

<template>
    <div class="app">
        <main class="column-wraper">
            <KanbanColumn v-for="i in 10"></KanbanColumn>
        </main>
    </div>
    
    
</template>

<style>
    .app{
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: start;
        justify-content: center;
    }
    .column-wraper{
        height: auto;
        width: 1700px;
        display: flex;
        flex-direction: row;
        gap: 20px;
        justify-content: flex-start;
        align-items: start;
        overflow-x: auto;
        scroll-behavior: smooth;
    }
</style>
