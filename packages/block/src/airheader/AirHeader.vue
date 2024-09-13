<template>
    <header :class="['flex items-center justify-between px-4', fixed ? 'fixed top-0 left-0 right-0 z-50' : '']"
        :style="{ height, backgroundColor: backgroundColor ?? '', color: textColor }">
        <div class="flex-1">
            <air-button v-if="showBack" @click="handleBack" type="success" class="text-sm font-medium">
                <i class="el-icon-arrow-left mr-1"></i>
                返回
            </air-button>
            <slot name="left"></slot>
        </div>
        <div class="flex-2 text-center">
            <h1 v-if="title" class="text-lg font-bold m-0">{{ title }}</h1>
            <h2 v-if="subtitle" class="text-sm font-normal mt-1 mb-0">{{ subtitle }}</h2>
            <slot></slot>
        </div>
        <div class="flex-1 text-right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script setup lang="ts">
import { AirButton } from '@air-ui/air-element/components/button';
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: undefined
    },
    subtitle: {
        type: String,
        default: undefined
    },
    fixed: {
        type: Boolean,
        default: false
    },
    height: {
        type: String,
        default: '60px'
    },
    backgroundColor: {
        type: String,
        default: undefined
    },
    textColor: {
        type: String,
        default: undefined
    },
    showBack: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits<{
    (e: 'back'): void;
}>();

const id = ref(`air-header-${Date.now()}`);

function handleBack() {
    emit('back');
}
</script>
