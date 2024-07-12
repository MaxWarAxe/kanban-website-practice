<script setup lang="ts">
    import { computed } from 'vue';
    import { Performer } from '@/classes/Performer'

    const props = defineProps<{
        title: string,
        content: string,
        performer: Performer | null
    }>();    
    let nameFirstLetter = computed (() => {
        return props.performer.name[0]
    })
    let isPerformerExists = computed (() => {
        if (props.performer == null)
            return false
        else
            return true
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
                <div class="card-container__picture"
                     data-test="performer-icon"
                     >
                    <div v-if = "!isPerformerExists">
                        ?
                    </div>
                    <div v-else>
                        {{ nameFirstLetter }}
                    </div>
                </div>
                <div v-if="isPerformerExists" 
                     class="card-container__performer-name"
                     data-test="performer-name"
                     >
                     {{ props.performer.name }}
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
    .card-container{
        width: 330px;
        height: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: var(--primary-bg-color);
        border-radius: 10px;
        box-shadow: 0px 5px 0px var(--primary-border-color);
        padding: 10px;
        transition: 0.2s;
        &__header{
            font-size: 18px;
            font-weight: 600;
            color: var(--primary-text-color);
            overflow: hidden;
        }
        &__content{
            font-size: 14px;
            font-weight: 400;
            color: var(--primary-text-color);
            overflow: hidden;
        }
        &__utility{
            height: 40px;
            width: 100%;
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
            color: var(--primary-text-color);
        }
        &:hover{
            background-color: var(--primary-selection-color);
            cursor: grab;
        }
    }
</style>