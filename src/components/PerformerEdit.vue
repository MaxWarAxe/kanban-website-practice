<script setup lang="ts">
    import { useKanbanStore } from '@/stores/kanban'
    import { ref, Ref } from 'vue'

    const kanbanStore = useKanbanStore()
    let newPerformerName: Ref<string> = ref('')
</script>

<template>
  <div class="performer-container">
    <div class="performer-container__new-performer-wrapper">
      <input
        class="performer-container__input" 
        type="text" 
        v-model="newPerformerName"
        data-test="name-input"
      >
      <svg
        @click="kanbanStore.addNewPerformer(newPerformerName)"
        class="performer-container__icon" 
        viewBox="0 0 24 24" 
        width="32" 
        height="32"
        data-test="add-button"
      >
        <use href="@/assets/icons/themeIcon.svg#add-user-icon" />
      </svg>
    </div>
      
    <div
      class="performer-container__profile" 
      v-for="performer in kanbanStore.performers"
      :key="performer.id"
    >
      <svg
        @click="kanbanStore.removePerformer(performer.id)" 
        class="performer-container__icon" 
        viewBox="0 0 24 24" 
        width="32" 
        height="32"
      >
        <use href="@/assets/icons/themeIcon.svg#trash-icon" />
      </svg>
      <div class="performer-container__picture">
        <div>{{ performer.name[0] }}</div>
      </div>
      <input
        class="performer-container__performer-name" 
        v-model="performer.name" 
        type="text"
        data-test="performer-change-input"
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .performer-container{
    display: flex;
    padding: 20px;
    gap: 10px;
    flex-direction: column;
    align-items: start;

    &__icon{
      fill: var(--primary-icon-color);
      cursor: pointer;
    }
    &__profile{
      display: flex;
      align-items: center;
      gap: 5px;
    }
    &__picture{
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: var(--button-text-color);
      border-radius: 50%;
      background-color: var(--primary-icon-color);
    }
    &__performer-name{
      font-size: 12px;
      background-color: transparent;
      border: 0px;
      font-family: inter;
      color: var(--primary-text-color);
    }
    &__input{
      background-color: transparent;
      font-size: 18px;
      color: var(--primary-text-color);
    }
    &__new-performer-wrapper{
      display: flex;
      gap: 10px;
    }
  }
</style>