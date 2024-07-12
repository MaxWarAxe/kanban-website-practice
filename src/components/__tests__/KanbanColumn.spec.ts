import { describe,it,expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import KanbanColumn from '@/components/KanbanColumn.vue'

describe('KanbanColumn tests', () => {
    
    it('Коректно рендерится', ()=>{
        const wrapper = mount(KanbanColumn)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Тест пропсов', async() =>{
        
        const wrapper = mount(KanbanColumn, {
            global: {
                plugins: [createTestingPinia({createSpy:vi.fn})],
            },
            props: {
                id : '1',
            },
        })
        wrapper.setData({q : 1})
        const headerText : string = wrapper.get('[data-test="header-input"]').text()
        expect(headerText).equals('Тестовое название')  
    })
})