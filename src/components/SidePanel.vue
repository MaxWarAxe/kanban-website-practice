<script setup lang="ts">
    import { useThemeStore } from '@/stores/theme';
    import { useKanbanStore } from '@/stores/kanban';
    import { useTaskPanelStore } from '@/stores/taskPanel';

    const props = defineProps<{
      dragging : boolean
    }>()

    const kanbanStore = useKanbanStore()
    const themeStore = useThemeStore()
    const taskPanel = useTaskPanelStore()
</script>

<template>
    <aside class="side-panel-container">
        <div @click="themeStore.toggleTheme()" 
             class="side-panel-container__button">
            <svg class="side-panel-container__icon" 
                 viewBox="0 0 24 24" 
                 width="32" 
                 height="32"
                 >
                <use href="@/assets/icons/themeIcon.svg#theme-icon"></use>
            </svg>
        </div>
        <RouterLink to="/users/add">
            <div @click="taskPanel.show()" 
                 class="side-panel-container__button"
                 >
                <svg class="side-panel-container__icon" 
                     viewBox="0 0 24 24" 
                     width="32" 
                     height="32"
                     >
                    <use href="@/assets/icons/themeIcon.svg#add-user-icon"></use>
                </svg>
            </div>
        </RouterLink>
        
        <div @drop="kanbanStore.onRemoveDrop($event)" 
             dropzone 
             @dragover.prevent 
             @dragenter.prevent 
             @dragleave.prevent 
             v-if="props.dragging" 
             class="side-panel-container__button-delete">
            <svg class="side-panel-container__icon-delete" 
                 viewBox="0 0 24 24" 
                 width="32" 
                 height="32">
                <use href="@/assets/icons/themeIcon.svg#trash-icon"></use>
            </svg>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
    $border_radius : 5px;

    .side-panel-container{
        width: 64px;
        height: 100vh;
        display: flex;
        gap: 20px;
        align-items: center;
        flex-direction: column;
        padding-top: 20px;
        background-color: var(--primary-container-color);
        &__button{
            background-color: var(--primary-icon-color);
            border-radius: $border_radius;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &__icon{
            width: auto;
            height: auto;
            fill: var(--button-text-color);
            &:hover{
                fill: var(--primary-selection-color);
                cursor: pointer;
            }
        }
        &__button-delete{
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
        
        &__icon-delete{
            width: 36px;
            height:36px;
            fill: var(--primary-icon-color);
        }
    }
    
    @keyframes blinking {
        0%{opacity: 0;} 
        50%{opacity: 1;}
        100%{opacity: 0;} 
    }
</style>