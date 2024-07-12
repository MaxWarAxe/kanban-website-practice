import type { Meta, StoryObj } from '@storybook/vue3'
import KanbanColumn from '@/components/KanbanColumn.vue'
import KanbanCard from '@/components/KanbanCard.vue'
import '@/assets/main.scss';

const meta : Meta<typeof KanbanColumn> = {
    component: KanbanColumn,
    subcomponents: KanbanCard,
    argTypes: {
        fill: {
          control: {
            type: 'boolean',
          },
        },
      },
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof KanbanColumn>

export const Primary : Story = {
    args:{
        id: 1,
        modelValue: ''
    },
    
}


export const WithModel : Story = {
    args:{
        id: 1,
        modelValue: 'Название колнки'
    },
    
}

export const WithOneCard : Story = {
    args:{
        id: 1,
        modelValue: 'Название колнки'
    },
    render: (args) => ({
        components: {  KanbanColumn,KanbanCard },
        setup() {
          return { ...args };
        },
        template: `
          <KanbanColumn>
            <KanbanCard title="Заголовок карточки" content="Содержание карточки" :performer="{name: 'Имя Фамилия'}"/>
          </KanbanColumn>`,
      }),
}

export const WithNCards : Story = {
    args:{
        id: 1,
        cardAmount: 120,
        modelValue: 'Название колнки'
    },
    render: (args) => ({
        components: {  KanbanColumn,KanbanCard },
        setup() {
          return { ...args };
        },
        template: `
          <KanbanColumn>
            <KanbanCard v-for="i in cardAmount" title="Заголовок карточки" content="Содержание карточки" :performer="{name: 'Имя Фамилия'}"/>
          </KanbanColumn>`,
      }),
}