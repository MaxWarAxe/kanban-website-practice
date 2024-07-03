import { defineStore } from "pinia"
import { ref } from 'vue'

export const useTaskPanelStore = defineStore('taskPanel', () => { 
    let visible = ref(false)
    
    function show(){
        visible.value = true
    }

    function close(){
        visible.value = false
    }

    return {visible,show,close}
})