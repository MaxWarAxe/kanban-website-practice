import { describe,it,expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia,createPinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useTaskPanelStore } from '@/stores/taskPanel'
import SidePanel from '@/components/SidePanel.vue'
import { nextTick } from 'vue'


describe('Sidepanel test', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('Корректно рендерится', async () => {
        const wrapper = mount(SidePanel, {
            global: {
                plugins: [createTestingPinia({createSpy: vi.fn, stubActions: false})]
            }
        })
        await nextTick()
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Переключение темы', async () => {
        const wrapper = mount(SidePanel, {
            global: {
                plugins: [createTestingPinia({createSpy: vi.fn, stubActions: false})]
            }
        })
        const themeStore = useThemeStore()
        themeStore.dark = true
        themeStore.light = false
        const button = wrapper.get('[data-test="toggle-theme-button"]')
        button.trigger('click')
        await nextTick()
        expect(themeStore.dark == false && themeStore.light == true).toBeTruthy()
    })

    it('Показ корзины', async () => {
        const wrapper = mount(SidePanel, {
            global: {
                plugins: [createTestingPinia({createSpy: vi.fn, stubActions: false})]
            },
            props : {
                dragging : true,
            }
        })
        const themeStore = useThemeStore()
        themeStore.dark = true
        themeStore.light = false
        const trashcan = wrapper.find('[data-test="trash-can"]')
        await nextTick()
        expect(trashcan.html()).toBeDefined()
    })

    it('Открывается панель с редактированием юзеров', async () => {
        const wrapper = mount(SidePanel, {
            global: {
                plugins: [createTestingPinia({createSpy: vi.fn, stubActions: false})]
            },
            props : {
                dragging : true,
            }
        })
        const taskPanelStore = useTaskPanelStore()
        const addUserButton = wrapper.get('[data-test="add-user-button"]')
        addUserButton.trigger('click')
        await nextTick()
        expect(taskPanelStore.visible).toBeTruthy()
    })
})