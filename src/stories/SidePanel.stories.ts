import type { Meta, StoryObj } from '@storybook/vue3'
import SidePanel from '@/components/SidePanel.vue'
import '@/assets/base.scss';
import '@/assets/main.scss';

const meta : Meta<typeof SidePanel> = {
    component: SidePanel,
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof SidePanel>

export const Primary : Story = {

}

export const WhileCardDrag : Story = {
    args:{
        dragging: true
    }
}