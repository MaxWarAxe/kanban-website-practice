import { defineStore } from "pinia"
import { Ref, ref } from 'vue'
import columnsJSON from '@/assets/data/columns.json' 
import type { Column } from '@/classes/Column.ts'
import type { Task } from '@/classes/Task.ts'
import type { Performer } from '@/classes/Performer.ts'

export const useKanbanStore = defineStore('kanban', () => { 
    const columnId : Ref<number> = ref(1)
    const taskId : Ref<number> = ref(1)
    const performerId : Ref<number> = ref(1)
    const columns : Ref<Column[]> = ref(new Array<Column>)
    const tasks : Ref<Task[]> = ref(new Array<Task>)
    const performers : Ref<Performer[]> = ref(new Array<Performer>)
    const dragging : Ref<boolean> = ref(false)

    function init(){   
        columns.value = columnsJSON
        for (let i = 0; i < columns.value.length; i++) {
            for (let j = 0; j < columns.value[i].items.length; j++){
                tasks.value.push(columns.value[i].items[j])
            }
        }
        for (let i = 0; i < tasks.value.length; i++) {
            if (tasks.value[i].performer == null)
                continue
            if (!performers.value.find((performer : Performer)=>performer.id == tasks.value[i].performer.id)) {
                performers.value.push(tasks.value[i].performer)
            }   
        }
        columnId.value = Math.max(...columns.value.map((column : Column) => column.id))
        taskId.value = Math.max(...tasks.value.map((task : Task) => task.id))
        performerId.value = Math.max(...performers.value.map((performer : Performer) => performer.id))
    }

    function removeItemFromColumn(itemID : number, columnID : number) {
        const column = columns.value.find((column : Column) => column.id === columnID)
        column.items = column.items.filter((item : Task) => item.id !== itemID)
    }

    function addItemToColumn(itemID : number, columnID : number) {
        const column = columns.value.find((column : Column) => column.id == columnID)
        column.items.push(tasks.value.find((task : Task) => task.id == itemID))
    }

    function moveItem(itemID : number, previousColumnID : number, newColumnID : number) {
        removeItemFromColumn(itemID, previousColumnID)
        addItemToColumn(itemID, newColumnID)
    }

    function addNewColumn() {
        const newColumnID = columnId.value++
        columns.value.push({id : newColumnID, header : 'Новая колонка', items : []})
    }

    function removeColumn(columnID : number) {
        columns.value = columns.value.filter((column : Column) => column.id != columnID)
    }

    function addNewItem(columnID : number) {
        const column = columns.value.find((column : Column) => column.id == columnID)
        const newTaskId = taskId.value++
        const newTask = {id : newTaskId, title : 'Новая задача', content : 'Новый текст', performer : null}
        tasks.value.push(newTask)
        column.items.push(newTask)
    }

    function startDrag(event : DragEvent, itemID : number,currentColumnID : number) {
        dragging.value = true
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('itemID', String(itemID))
        event.dataTransfer.setData('columnID',String(currentColumnID))
    }

    function onDropColumn(event : DragEvent, columnID : number) {
        const itemID = Number(event.dataTransfer.getData('itemID'))
        const previousColumnID = Number(event.dataTransfer.getData('columnID'))
        moveItem(itemID,previousColumnID, columnID)
    }    

    function dragEnd(){
        dragging.value = false
    }

    function removeTask(taskID : number, columnID : number) {
        removeItemFromColumn(taskID, columnID)
        tasks.value = tasks.value.filter(task => task.id != taskID)
    }

    function onRemoveDrop(event : DragEvent) {
        const itemID = Number(event.dataTransfer.getData('itemID'))
        const previousColumnID = Number(event.dataTransfer.getData('columnID'))
        removeTask(itemID,previousColumnID)
    }

    function getTask(taskID : number) {
        return tasks.value.find(task => task.id == taskID)
    }

    function addNewPerformer(name : string) {
        const newPerformerId = performerId.value++
        performers.value.push({id : newPerformerId, name : name})
    }

    function removePerformer(performerID : number) {
        tasks.value.forEach(function(task){
            if (task.performer != null && task.performer.id == performerID)
                task.performer = undefined
        })
        performers.value = performers.value.filter(performer=>performer.id != performerID)
    }

    return {
        onRemoveDrop,
        dragging,
        dragEnd,
        columns,
        tasks,
        performers,
        init,
        moveItem,
        addNewColumn,
        removeColumn,
        addNewItem, 
        startDrag,
        onDropColumn,
        getTask,
        addNewPerformer,
        removePerformer
    }
})