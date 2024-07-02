<script setup>
    import KanbanCard from './KanbanCard.vue';
    const props = defineProps({
        header : String
    })
    
 
</script>

<template>
    <div class="column-container">
        <header class="column-container__header">
            {{ props.header }}
        </header>
        <main dropzone @dragover.prevent @dragenter.prevent @dragleave.prevent class="column-container__content">
            <slot></slot>      
        </main>
    </div>
</template>

<style lang="scss" scoped>
    $border_radius : 10px;

    .column-container{
        min-width: 400px;
    
        height: auto; 
        display: flex;
        flex-direction: column;
        background-color: var(--primary-container-color);
        border-radius: $border_radius;
    }
    .column-container__header{
        height: 80px;
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        padding-left: 30px;
        font-size: 24px;
        font-weight: bold;
        color: var(--secondary-text-color);
        background-color: var(--primary-selection-color);
        border-radius: $border_radius $border_radius 0px 0px;
    }
    .column-container__content{
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
</style>