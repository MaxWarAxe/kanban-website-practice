import type { Meta, StoryObj } from '@storybook/vue3'
import KanbanCard from '@/components/KanbanCard.vue'
import '@/assets/base.scss';
import '@/assets/main.scss';
const meta : Meta<typeof KanbanCard> = {
    component: KanbanCard,
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof KanbanCard>

export const Primary : Story = {
    args : {
        title : 'Заголовок задачи',
        content: 'Содержание задачи',
        performer: {id : 1, name: 'Иван Иванов'}
    }
}

export const WithoutPerformer : Story = {
    args : {
        title : 'Заголовок задачи',
        content: 'Содержание задачи',
        performer: null
    }
}


export const EmptyProps : Story = {
    args : {
        title : '',
        content: '',
        performer: null
    }
}