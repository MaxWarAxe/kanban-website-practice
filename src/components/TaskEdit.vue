<script setup>
    import { useRoute,useRouter } from 'vue-router';
    import { useKanbanStore } from '@/stores/kanban';

    const route = useRoute()
    const router = useRouter()
    const kanbanStore = useKanbanStore()

    let task = changeTask(route.params.id)

    router.afterEach((to, from, next) => {
        task = changeTask(route.params.id)
    })
    
    
    function changeTask(id){
        return kanbanStore.getTask(id)
    }
    console.log(task)
</script>

<template>
    <div  class="task-edit-container">
        <label class="task-edit-container__label" >Название</label>
        <textarea class="task-edit-container__text-area" type="text" v-model="task.title" placeholder="Напишите название задачи"></textarea>
        <label class="task-edit-container__label" >Содержание</label>
        <textarea class="task-edit-container__text-area" type="text" v-model="task.content" placeholder="Напишите содержание задачи"></textarea>
        <label class="task-edit-container__label">Исполнитель</label>
        <select class="task-edit-container__text-area" name="" id="" v-model="task.performer" placeholder="Работник">
            <option class="task-edit-container__option" v-bind:value="performer">{{null}}</option>
            <option class="task-edit-container__option" v-bind:value="performer" v-for="performer in kanbanStore.performers" :key="performer">{{ performer.name }}</option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
    .task-edit-container{
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 10px;
    }
    .task-edit-container__text-area{
        background-color: transparent;
        border-radius: 10px;
        padding: 10px;
        color: var(--primary-text-color);
        border-color: var(--primary-border-color);
        border-width: 5px;
        font-size: 18px;
        font-family: inter;
        font-weight: 600;
    }
    .task-edit-container__option{
        background: var(--primary-container-color);
        font-family: inter;
        font-weight: 600;
    }
    .task-edit-container__label{
        color: var(--secondary-text-color);
        font-size: 18px;
    }
</style>