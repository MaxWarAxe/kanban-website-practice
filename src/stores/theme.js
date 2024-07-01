import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useThemeStore = defineStore('theme', () => {
    let dark = ref(false)
    let light = ref(false)

    function init(){
        const state1 = localStorageGet()
        if(state1 != undefined){
            dark.value = state1.dark
            light.value = state1.light
            console.log('storageUseed')
        }
        else{
            let darkColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
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
        if (dark) {
            document.body.classList.add('dark-theme');
        } else if (light) {
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