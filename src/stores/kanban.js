import { defineStore } from "pinia"
import { ref } from 'vue'
import performersJSON from '../../public/performers.json'
import tasksJSON from '../../public/tasks.json'
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
        // performers.value = performersJSON
        // tasks.value = tasksJSON.map((task)=>{task.performer = performers.value.find(performer => performer.id == task.performerId); return task})
        // columns.value = columnsJSON.forEach((column)=>)
        performers.value = [{id : 1, name : 'Иван Иванчевич'},
                            {id : 2, name : 'Григорий Григориевич'},
                            {id : 3, name : 'Максим Максомов'}]

        tasks.value = [{id : 1, title : 'Задача по проге', content : '1. Сделай то 2. Сделай сё 3. Сделай это', performer: performers.value[0]},
                       {id : 2, title : 'Задача по тестированию', content : 'Напиши тесты по тому, по сему', performer : performers.value[1]},
                       {id : 3, title : 'Вводим в эксплуатацию', content : 'Текст какой-то Текст какой-то Текст какой-то Текст какой-то', performer : performers.value[2]}]
        
        
        columns.value = [{id: 1, header : 'Todo', items : [tasks.value[0]]},
                        {id : 2, header : 'Tests', items : [tasks.value[1]]},
                        {id : 3, header : 'Done', items : [tasks.value[2]]}]
                           console.log(JSON.stringify(columns.value))      
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