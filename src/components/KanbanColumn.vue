<script setup lang="ts">
    import { useKanbanStore } from '@/stores/kanban.ts'
    import { ModelRef } from 'vue';
    const kanbanStore = useKanbanStore()
    
    const props = defineProps<{
        id : number
    }>()

    let headerName : ModelRef<string> = defineModel()
</script>

<template>
    <div class="column-container">
        <header class="column-container__header">
            <input class="column-container__header-text column-container__header-input" 
                   placeholder="Без названия" 
                   v-model="headerName"
                   data-test="header-input"
                   />
            <svg @click="kanbanStore.addNewItem(props.id)" 
                  class="column-container__icon" 
                  viewBox="0 0 24 24" width="32" 
                  height="32"
                  data-test="add-button"
                  >
                <use href="@/assets/icons/themeIcon.svg#plus-icon"/>
            </svg>
            <svg @click="kanbanStore.removeColumn(props.id)" 
                 class="column-container__icon"
                 viewBox="0 0 24 24" 
                 width="32" 
                 height="32"
                 data-test="remove-button"
                 >
                <use href="@/assets/icons/themeIcon.svg#trash-icon"/>
            </svg>
        </header>
        <main dropzone 
              @dragover.prevent 
              @dragenter.prevent 
              @dragleave.prevent 
              class="column-container__content"
              >
            <slot data-test="task"></slot>      
        </main>
    </div>
</template>

<style lang="scss" scoped>
    $border_radius : 10px;
    $header_padding : 30px;

    .column-container{
        width: 400px;
        min-width: 400px;
        height: auto; 
        display: flex;
        flex-direction: column;
        background-color: var(--primary-container-color);
        border-radius: $border_radius;
     
        &__header{
            height: 80px;
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            padding-left: $header_padding;
            padding-right: $header_padding;
            font-size: 24px;
            font-weight: bold;
            gap: 20px;
            color: var(--secondary-text-color);
            background-color: var(--primary-selection-color);
            border-radius: $border_radius $border_radius 0px 0px;
        }

        &__header-text{
            margin-right: auto;
        }

        &__header-input{
            font-size: 30px;
            width: 100%;
            color: var(--secondary-text-color);
            background-color: transparent;
            border: 0;
        }
        
        &__content{
            width: 100%;
            min-height: 260px;
            display: flex;
            max-height: 780px;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: thin;
            gap: 30px;
            padding: 30px;
            align-items: center;
            flex-direction: column;
        }
        
        &__icon{
            fill: var(--secondary-text-color);
            width: 48px;
            height: 48px;
            cursor: pointer;
        }
    }
    
    
   
</style>