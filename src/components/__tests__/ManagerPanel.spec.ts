import { describe,it,expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia,createPinia } from 'pinia'
import { useTaskPanelStore } from '@/stores/taskPanel'
import ManagerPanel from '@/views/ManagerPanel.vue'
import { nextTick } from 'vue'
import router from '@/router/index.ts'

describe('ManagerPanel tests', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })  

    it('Корректно рендерится', async () => {
        const wrapper = mount(ManagerPanel, {
            global: {
                plugins: [
                    createTestingPinia({createSpy: vi.fn, stubActions: false}),
                    router
                ]
            }
        })
        await nextTick()
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Закрывается по кнопке', async () => {
        const wrapper = mount(ManagerPanel, {
            global: {
                plugins: [
                    createTestingPinia({createSpy: vi.fn, stubActions: false}),
                    router
                ]
            }
        })
        const taskPanelStore = useTaskPanelStore()
        const button = wrapper.get('[data-test="cross-button"]')
        button.trigger('click')
        await nextTick()
        expect(taskPanelStore.visible).toBeFalsy()
    })
})  