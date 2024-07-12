import type { Meta, StoryObj } from '@storybook/vue3'
import PerformerEdit from '@/components/PerformerEdit.vue'
import '@/assets/base.scss';
import '@/assets/main.scss';

const meta : Meta<typeof PerformerEdit> = {
    component: PerformerEdit,
    tags: ['autodocs']
}

export default meta;
type Story = StoryObj<typeof PerformerEdit>

export const Primary : Story = {

}