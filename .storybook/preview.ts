
import { type Preview, setup }  from '@storybook/vue3';
import { type App } from 'vue';
import { useKanbanStore } from '@/stores/kanban.ts'
import { useThemeStore } from '@/stores/theme.ts'
import { useTaskPanelStore } from '@/stores/taskPanel.ts'
import '@/assets/base.scss';
import '@/assets/main.scss';

 
import { createPinia } from 'pinia';
import router from '@/router/index.ts'
const pinia = createPinia();


setup((app: App) => {
    app.use(pinia);
    const kanbanStore = useKanbanStore()
    const taskPanelStore = useTaskPanelStore()
    const themeStore = useThemeStore()
    app.use(kanbanStore).use(themeStore).use(taskPanelStore).use(router)
    themeStore.init()
});



const preview : Preview= {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#171723',  
        },
        {
          name: 'light',
          value: '#EBECEE',  
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
