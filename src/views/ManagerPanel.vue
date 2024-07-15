<script setup lang="ts">
    import { useTaskPanelStore } from '@/stores/taskPanel';
    import { RouterView } from 'vue-router';

    const taskPanelStore = useTaskPanelStore()
</script>

<template>
  <div class="task-panel">
    <div
      class="task-panel__cross-button"
      @click="taskPanelStore.close()"
      data-test="cross-button"
    >
      <svg
        class="task-panel__cross-icon"
        viewBox="0 0 24 24"
        width="32"
        height="32"
      >
        <use href="@/assets/icons/themeIcon.svg#cross-icon" />
      </svg>
    </div>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
    .task-panel{
        width: 350px;
        height: 100vh;
        top: 0px;
        resize: horizontal;
        overflow: auto;
        right: 0px;
        position: absolute;
        background-color: var(--primary-container-color);
        border-left: solid;
        border-color: var(--primary-border-color);
    }
    .task-panel__cross-icon{
        fill: var(--primary-icon-color)
    }
</style>