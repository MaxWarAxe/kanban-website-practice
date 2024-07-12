import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const dark : Ref<boolean> = ref(true)
    const light : Ref<boolean> = ref(false)

    function init(){
        const state = localStorageGet()
        if(state != undefined){
            dark.value = state.dark
            light.value = state.light
        }
        else{
            const darkColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
            dark.value = darkColorScheme.matches
            light.value = !darkColorScheme.matches
            localStorageSave()
        }
        applyClasses()
    }

    function toggleTheme(){
        dark.value = !dark.value
        light.value = !light.value
        applyClasses()
        localStorageSave()
    }

    function applyClasses(){
        document.body.classList.remove('light-theme', 'dark-theme');
        if (dark.value) {
            document.body.classList.add('dark-theme');
        }
        if (light.value) {
            document.body.classList.add('light-theme');
        }
    }

    function localStorageSave(){
        const stateToSave = {dark : dark.value, 
                            light : light.value}
        localStorage.setItem('THEME_STATE',JSON.stringify(stateToSave));
    }

    function localStorageGet(){
        return JSON.parse(localStorage.getItem('THEME_STATE'))
    }
    
    return {
        dark,
        light,
        init,
        toggleTheme,
        applyClasses,
        localStorageSave,
        localStorageGet
    }
})