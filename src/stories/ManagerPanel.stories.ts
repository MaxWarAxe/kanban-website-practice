import type { Meta, StoryObj } from '@storybook/vue3'
import ManagerPanel from '@/views/ManagerPanel.vue'
import { vueRouter } from 'storybook-vue3-router' 
import PerformerEdit from '@/components/PerformerEdit.vue'
import '@/assets/base.scss';
import '@/assets/main.scss';

const meta : Meta<typeof ManagerPanel> = {
    component: ManagerPanel,
    
    tags: ['autodocs'],
    
}
export default meta;
type Story = StoryObj<typeof ManagerPanel>
export const Primary : Story = { }

const routes =  [
    { path: '/tasks/:id', component: TaskEdit},
    { path: '/users/add', component: PerformerEdit}
]

meta.decorators = [
    /* this is the basic setup with no params passed to the decorator */
    vueRouter(routes)
]