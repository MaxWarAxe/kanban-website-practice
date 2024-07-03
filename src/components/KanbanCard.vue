<script setup>
    let props = defineProps({
        title : String,
        content : String,
        performer : Object,
    })
</script>

<template>
    <div class="card-container">
        <header class="card-container__header">
            {{ props.title }}
        </header>
        <main class="card-container__content">
            {{ props.content }}
        </main>
        <footer class="card-container__utility">
            <div class="card-container__profile">
                <div class="card-container__picture">
                    <div v-if="props.performer == undefined">?</div>
                    <div v-else>{{props.performer.name[0]}}</div>
                </div>
                <div v-if="props.performer != undefined" class="card-container__performer-name">
                    {{ props.performer.name }}
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
    .card-container{
        width: 330px;
        // height: 238px;
        height: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: var(--primary-bg-color);
        border-radius: 10px;
        box-shadow: 0px 5px 0px var(--primary-border-color);
        padding: 10px;
        transition: 0.2s;
    }
    .card-container:hover{
        background-color: var(--primary-selection-color);
        cursor: grab;
    }
    .card-container__header{
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        overflow: hidden;
    }
    .card-container__content{
        font-size: 14px;
        font-weight: 400;
        color: var(--primary-text-color);
        overflow: hidden;
    }
    .card-container__utility{
        height: 40px;
        width: 100%;
    }
    .card-container__profile{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .card-container__picture{
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
    .card-container__performer-name{
        font-size: 12px;
        color: var(--primary-text-color);
    }
</style>