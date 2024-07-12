import { defineStore } from "pinia"
import { Ref, ref } from 'vue'

export const useTaskPanelStore = defineStore('taskPanel', () => { 
    const visible : Ref<boolean> = ref(false)
    
    function show(){
        visible.value = true
    }

    function close(){
        visible.value = false
    }

    return {
        visible,
        show,
        close
    }
})