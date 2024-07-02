<script setup>
    import { useThemeStore } from '@/stores/theme';

    const themeStore = useThemeStore()
</script>

<template>
    <aside class="side-panel-container">
        <div @click="themeStore.toggleTheme()" class="side-panel-container__button">
            <svg class="side-panel-container__icon" viewBox="0 0 24 24" width="32" height="32">
                <use href="@/assets/icons/themeIcon.svg#theme-icon"></use>
            </svg>
        </div>
        
    </aside>
</template>

<style lang="scss" scoped>
    .side-panel-container{
        width: 64px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: start;
        padding-top: 20px;
        background-color: var(--primary-container-color);
    }
    .side-panel-container__button{
        background-color: var(--primary-icon-color);
        border-radius: 5px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .side-panel-container__icon{
        width: auto;
        height: auto;
        
        
        
        fill: var(--button-text-color);
    }
    .side-panel-container__icon:hover{
        fill: var(--primary-selection-color);
        cursor: pointer;
    }
</style>