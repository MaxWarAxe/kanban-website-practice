import { describe,it,expect,beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia, createPinia } from 'pinia'
import { vi } from 'vitest'
import KanbanColumn from '@/components/KanbanColumn.vue'
import { useKanbanStore } from '@/stores/kanban'
import { nextTick } from 'vue'
import { Column } from '@/classes/Column'
import { Task } from '@/classes/Task'
describe('KanbanColumn tests', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('Коректно рендерится', ()=>{
        const wrapper = mount(KanbanColumn, {
            global: {
                plugins: [createTestingPinia({createSpy:vi.fn})]
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Добавляется задача (store)',async ()=>{
        const wrapper = mount(KanbanColumn, {
            global: {
                plugins: [createTestingPinia({createSpy:vi.fn,stubActions: false})]
            },
            props : {
                id: 1,
            }
        })

        const kanbanStore = useKanbanStore()
        kanbanStore.columns.push(new Column(1,'Тестовое название', []))
        wrapper.get('[data-test="add-button"]').trigger('click')
        await nextTick()
        expect(kanbanStore.tasks.length).toBe(1)
    })

    it('Удаление колонки (store)',async ()=>{
        const wrapper = mount(KanbanColumn, {
            global: {
                plugins: [createTestingPinia({createSpy:vi.fn,stubActions: false})]
            },
            props : {
                id: 1,
            }
        })

        const kanbanStore = useKanbanStore()
        kanbanStore.columns.push(new Column(1,'Тестовое название', []))
        wrapper.get('[data-test="add-button"]').trigger('click')
        await nextTick()
        const removeButton = wrapper.find('[data-test="remove-button"]')
        removeButton.trigger('click')
        console.log(wrapper.html())
        expect(kanbanStore.columns.length).toBe(0)
    })
})