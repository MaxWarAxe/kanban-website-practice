<script setup>
    import { useThemeStore } from '@/stores/theme';
    import { useKanbanStore } from '@/stores/kanban';

    const kanbanStore = useKanbanStore()
    const themeStore = useThemeStore()
</script>

<template>
    <aside class="side-panel-container">
        <div @click="themeStore.toggleTheme()" class="side-panel-container__button">
            <svg class="side-panel-container__icon" viewBox="0 0 24 24" width="32" height="32">
                <use href="@/assets/icons/themeIcon.svg#theme-icon"></use>
            </svg>
            
        </div>
        <div @drop="kanbanStore.onRemoveDrop($event)" dropzone @dragover.prevent @dragenter.prevent @dragleave.prevent v-if="kanbanStore.dragging" class="side-panel-container__button-delete">
            <svg class="side-panel-container__icon-delete" viewBox="0 0 24 24" width="32" height="32">
                <use href="@/assets/icons/themeIcon.svg#trash-icon"></use>
            </svg>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
    $border_radius : 5px;

    .side-panel-container{
        width: 64px;
        height: 100%;
        display: flex;
        gap: 20px;
        align-items: center;
        flex-direction: column;
        padding-top: 20px;
        background-color: var(--primary-container-color);
    }
    .side-panel-container__button{
        background-color: var(--primary-icon-color);
        border-radius: $border_radius;
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
    .side-panel-container__button-delete{
        width: 36px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border-radius:  $border_radius;
        border: dashed;
        border-color: var(--primary-icon-color);
        animation: blinking 1s infinite;
    }
    @keyframes blinking {
        0%{opacity: 0;} 
        50%{opacity: 1;}
        100%{opacity: 0;} 
    }
    .side-panel-container__icon-delete{
        width: 36px;
        height:36px;
        fill: var(--primary-icon-color);
    }
    .side-panel-container__icon:hover{
        fill: var(--primary-selection-color);
        cursor: pointer;
    }
</style>