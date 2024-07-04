import { defineStore } from "pinia"
import { ref } from 'vue'
import columnsJSON from '../../public/columns.json'

export const useKanbanStore = defineStore('kanban', () => { 
    let columnId = ref(3)
    let taskId = ref(3)
    let performerId = ref(3)
    let columns = ref([])
    let tasks = ref([])
    let performers = ref([])
    let dragging = ref(false)

    function init(){   
        columns.value = columnsJSON
        for(let i = 0; i < columns.value.length; i++){
           
            for(let j = 0; j < columns.value[i].items.length; j++){
                tasks.value.push(columns.value[i].items[j])
            }
        }
        for(let i = 0; i < tasks.value.length; i++){
            if(tasks.value[i].performer == null)
                continue
            if(!performers.value.find((performer)=>performer.id == tasks.value[i].performer.id)){
                performers.value.push(tasks.value[i].performer)
            }   
        }

        columnId.value = Math.max(...columns.value.map(column => column.id))
        taskId.value = Math.max(...tasks.value.map(task => task.id))
        performerId.value = Math.max(...performers.value.map(performer=>performerId))
    }

    function removeItemFromColumn(itemID, columnID){
    var column = columns.value.find(column => column.id == columnID)
        column.items = column.items.filter(function(item) {
            return item.id != itemID;
        });
    }

    function addItemToColumn(itemID, columnID){
        var column = columns.value.find(column => column.id == columnID)
        column.items.push(tasks.value.find(task => task.id == itemID))
    }

    function moveItem(itemID, previousColumnID, newColumnID){
        removeItemFromColumn(itemID, previousColumnID)
        addItemToColumn(itemID, newColumnID)
    }

    function addNewColumn(){
        columns.value.push({id : ++columnId.value, header : 'Новая колонка', items : []})
    }

    function removeColumn(columnID){
        var column = columns.value.find(column => column.id == columnID)
        columns.value = columns.value.filter(function(column) {
            return column.id != columnID;
        });
    }

    function addNewItem(columnID){
        var column = columns.value.find(column => column.id == columnID)
        var newTask = {id : ++taskId.value, title : 'Новая задача', content : 'Новый текст', performer : null}
        tasks.value.push(newTask)
        column.items.push(newTask)
    }

    function startDrag(event,itemID,currentColumnID){
        dragging.value = true
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('itemID', itemID)
        event.dataTransfer.setData('columnID',currentColumnID)
    }

    function onDropColumn(event, columnID) {
        const itemID = event.dataTransfer.getData('itemID')
        const previousColumnID = event.dataTransfer.getData('columnID')
        moveItem(itemID,previousColumnID, columnID)
    }    

    function dragEnd(){
        dragging.value = false
    }

    function removeTask(taskID, columnID){
        removeItemFromColumn(taskID, columnID)
        tasks.value = tasks.value.filter(function(task){
            return task.id != taskID;
        })
    }

    function onRemoveDrop(event){
        const itemID = event.dataTransfer.getData('itemID')
        const previousColumnID = event.dataTransfer.getData('columnID')
        removeTask(itemID,previousColumnID)
    }

    function getTask(taskID){
        return tasks.value.find(task => task.id == taskID)
    }

    function addNewPerformer(name){
        performers.value.push({id : ++performerId.value, name : name})
    }

    function removePerformer(performerID){
        tasks.value.forEach(function(task){
            if(task.performer != null && task.performer.id == performerID)
                task.performer = undefined
        })
        performers.value = performers.value.filter(function(performer){
            return performer.id != performerID;
        })
    }

    return{
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