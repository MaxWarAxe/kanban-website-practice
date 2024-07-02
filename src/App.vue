<script setup>
    import { useThemeStore } from './stores/theme';
    import {useKanbanStore} from '@/stores/kanban'
    import KanbanColumn from './components/KanbanColumn.vue';
    import KanbanCard from './components/KanbanCard.vue';
    import SidePanel from './components/SidePanel.vue';
    

    const themeStore = useThemeStore()
    themeStore.init()

    const kanbanStore = useKanbanStore()
    kanbanStore.init()
    
    
    function startDrag(event,itemID,currentColumnID){
        event.target.classList.add('dragging')
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('itemID', itemID)
        event.dataTransfer.setData('columnID',currentColumnID)
    }
    function onDrop(event, columnID) {
        const itemID = event.dataTransfer.getData('itemID')
        const previousColumnID = event.dataTransfer.getData('columnID')
        kanbanStore.moveItem(itemID,previousColumnID, columnID)
       
    }    

    
</script>

<template>
    <div class="app">
        <SidePanel></SidePanel>
        <main class="main-section">
            <div class="main-section__column-wraper">
                <KanbanColumn @drop="onDrop($event,column.id)" :header="column.header" v-for="column in kanbanStore.columns">
                    <KanbanCard draggable="true" @dragstart="startDrag($event,item.id,column.id)" v-for="item in column.items" :title="item.title" :content="item.content" :performer_name="item.performer_name" :key="item.id" ></KanbanCard>
                </KanbanColumn>
            </div>
        </main>
        
    </div>
    
    
</template>

<style>

    .app{
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: start;

    }
    .main-section{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main-section__column-wraper{
        height: auto;
        max-width: 1700px;
        display: flex;
        flex-direction: row;
        gap: 20px;
        justify-content: flex-start;
        align-items: start;
        overflow-x: auto;
        scroll-behavior: smooth;
    }
</style>
