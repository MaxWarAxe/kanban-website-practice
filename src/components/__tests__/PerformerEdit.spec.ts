import { describe,it,expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia,createPinia } from 'pinia'
import { useKanbanStore } from '@/stores/kanban'
import PerformerEdit from '@/components/PerformerEdit.vue'
import { nextTick } from 'vue'

describe('PerformerEdit tests', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('Коректно рендерится', ()=>{
        const wrapper = mount(PerformerEdit, {
            global: {
                plugins: [createTestingPinia({createSpy:vi.fn})]
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Тест создания исполнителя',async ()=> {
        const wrapper = mount(PerformerEdit, {
            global: {
                plugins: [createTestingPinia({createSpy:vi.fn , stubActions: false})]
            }
        })
        const kanbanStore = useKanbanStore()
        const addButton = wrapper.get('[data-test="add-button"]')
        addButton.trigger('click')
        await nextTick()
        expect(kanbanStore.performers.length).toBe(1)
    })

    it('Тест создания исполнителя с именем store',async ()=> {
        const wrapper = mount(PerformerEdit, {
            global: {
                plugins: [createTestingPinia({createSpy:vi.fn , stubActions: false})]
            }
        })
        const kanbanStore = useKanbanStore()
        const input = wrapper.get('[data-test="name-input"]')
        input.setValue('Иван')
        await nextTick()
        const addButton = wrapper.get('[data-test="add-button"]')
        addButton.trigger('click')
        await nextTick()
        expect(kanbanStore.performers[0].name).toBe('Иван')
    })

    it('Тест создания исполнителя с именем (изменение в компоненте)',async ()=> {
        const wrapper = mount(PerformerEdit, {
            global: {
                plugins: [createTestingPinia({createSpy:vi.fn , stubActions: false})]
            }
        })
        const input = wrapper.get('[data-test="name-input"]')
        input.setValue('Иван')
        await nextTick()
        const addButton = wrapper.get('[data-test="add-button"]')
        addButton.trigger('click')
        await nextTick()
        expect(wrapper.get('[data-test="performer-change-input"]').element.value).toBe('Иван')
    })
})