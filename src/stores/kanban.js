import { defineStore } from "pinia"
import { ref } from 'vue'

export const useKanbanStore = defineStore('kanban', () => { 
    let columns = ref([])
    let tasks = ref([])

    function init(){
        tasks.value = [{id : 1, title : 'Задача по проге', content : '1. Сделай то 2. Сделай сё 3. Сделай это', performer_name : 'Иван Гошев'},
                       {id : 2, title : 'Задача по тестированию', content : 'Напиши тесты по тому, по сему', performer_name : 'Григорий Ивашев'},
                       {id : 3, title : 'Вводим в эксплуатация', content : 'Текст какой-то Текст какой-то Текст какой-то Текст какой-то', performer_name : 'Максим Максимович'}]
        
        columns.value = [{id: 1, header : 'Todo', items : [tasks.value[0]]},
                        {id : 2, header : 'Tests', items : [tasks.value[1]]},
                        {id : 3, header : 'Done', items : [tasks.value[2]]}]
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

    return{columns,tasks,init,moveItem}
})