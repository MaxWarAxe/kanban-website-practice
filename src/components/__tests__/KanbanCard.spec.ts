

import { describe,it,expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KanbanCard from '@/components/KanbanCard.vue'


describe('KanbanCard', () => {

    it('Коректно рендерится', ()=>{
        const wrapper = mount(KanbanCard)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Пропсы должны корректно рендериться', async() => {
        const wrapper = mount(KanbanCard,{
            props : {
                title: 'Тестовое название',
                content: 'Тестовый контент',
                performer: {id : 1, name: 'Тестовый исполнитель'}
            }
        })
        expect(wrapper.find('header').text()).toEqual('Тестовое название')
        expect(wrapper.find('main').text()).toEqual('Тестовый контент')
        expect(wrapper.get('[data-test="performer-name"]').text()).toEqual('Тестовый исполнитель')
    })

    it('Иконка исполнителя корректно рендерится', async() => {
        const wrapper = mount(KanbanCard,{
            props : {
                title: 'Тестовое название',
                content: 'Тестовый контент',
                performer: {id : 1, name: 'Тестовый исполнитель'}
            }
        })
        expect(wrapper.get('[data-test="performer-icon"]').text()).toEqual('Т')
        const wrapper2 = mount(KanbanCard,{
            props : {
                title: 'Тестовое название',
                content: 'Тестовый контент',
                performer: null
            }
        })
        expect(wrapper2.get('[data-test="performer-icon"]').text()).toEqual('?')
    })

})