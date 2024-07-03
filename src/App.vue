<script setup>
    import { useThemeStore } from '@/stores/theme'
    import { useKanbanStore } from '@/stores/kanban'
    import { useTaskPanelStore } from '@/stores/taskPanel'
    import { ref } from 'vue'
    import KanbanColumn from './components/KanbanColumn.vue'
    import KanbanCard from './components/KanbanCard.vue'
    import SidePanel from './components/SidePanel.vue'
    import ManagerPanel from './views/ManagerPanel.vue'
    

    const themeStore = useThemeStore()
    themeStore.init()

    const kanbanStore = useKanbanStore()
    kanbanStore.init()

    const taskPanelStore = useTaskPanelStore()

    function showTaskPanel(){
        taskPanelStore.show()
    }
    
</script>

<template>
    <div class="app">
        <SidePanel></SidePanel>
        <main class="main-section">
            <div class="main-section__column-wraper">
                <KanbanColumn @drop="kanbanStore.onDropColumn($event,column.id)" :id="column.id" v-model="column.header" v-for="column in kanbanStore.columns">
                    <RouterLink class="router-link" :to="'/tasks/' + item.id" v-for="item in column.items" @click="showTaskPanel" draggable="true" @dragend="kanbanStore.dragEnd()" @dragstart="kanbanStore.startDrag($event,item.id,column.id)">
                        <KanbanCard :title="item.title" :content="item.content" :performer="item.performer" :key="item.id"/>
                    </RouterLink> 
                </KanbanColumn>
                <div @click="kanbanStore.addNewColumn()" class="main-section__add-column-button">
                    ДОБАВИТЬ
                </div>
            </div>
        </main>
        <ManagerPanel v-if="taskPanelStore.visible"></ManagerPanel>
    </div>
    
    
</template>

<style>
    .router-link{
        text-decoration: none;
    }
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
    .main-section__add-column-button{
        min-width: 400px;
        height: 80px;
        display: flex;
        border: dashed;
        border-radius: 10px;
        color: var(--primary-text-color);
        align-items: center;
        justify-content: center;
        text-align: center;
        vertical-align: center;  
        font-size: 32px;
        font-weight: bold;  
    }
    .main-section__add-column-button:hover{
        background-color: var(--primary-selection-color);
    }
</style>
