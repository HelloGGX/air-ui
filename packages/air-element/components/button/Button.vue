<template>
    <button
        :class="[
            'air-btn',
            buttonSizeClass,
            buttonTypeClass,
            { 'is-disabled': isDisabled, 'is-plain': isPlain, 'is-round': isRound }
        ]"
        @click="handleClick"
        :disabled="isDisabled"
        :style="buttonStyle"
    >
        <!-- 左侧图标 -->
        <span v-if="props.leftIcon" class="air-btn__icon--left">
            <ElIcon class="air-btn__icon">
                <component :is="props.leftIcon" />
            </ElIcon>
        </span>
        <!-- Loading 图标显示在按钮的右侧 -->
        <span v-if="props.loading" class="air-btn__icon--left air-btn__icon--spin">
            <ElIcon class="air-btn__icon">
                <component :is="props.loadingIcon" />
            </ElIcon>
        </span>
        <slot />
        <!-- 右侧图标 -->
        <span v-if="props.rightIcon" class="air-btn__icon--right">
            <ElIcon class="air-btn__icon">
                <component :is="props.rightIcon" />
            </ElIcon>
        </span>
    </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { buttonProps, buttonEmits } from './Button';
import { ElIcon } from 'element-plus';
import { useButtonCustomStyle } from './button-custom';

defineOptions({ name: 'AirButton' });

const props = defineProps(buttonProps);

const emit = defineEmits(buttonEmits);

const buttonRef = ref<HTMLButtonElement>();

// 计算按钮的禁用状态
const isDisabled = computed(() => props.disabled);
const isPlain = computed(() => props.plain);
const isRound = computed(() => props.round);

// 按钮类型与大小类映射
const buttonTypes = {
    primary: 'air-btn--primary',
    success: 'air-btn--success',
    danger: 'air-btn--danger',
    warning: 'air-btn--warning',
    info: 'air-btn--info',
    default: 'air-btn--default'
};

const buttonSizes = {
    small: 'air-btn--small',
    large: 'air-btn--large',
    default: 'air-btn--default-size'
};

// 计算按钮类型的类
const buttonTypeClass = computed(() => buttonTypes[props.type || 'default']);
// 计算按钮大小的类
const buttonSizeClass = computed(() => buttonSizes[props.size || 'default']);

const { buttonStyle } = useButtonCustomStyle(props);

// 处理按钮点击事件
const handleClick = (event: MouseEvent) => {
    if (!isDisabled.value) {
        emit('click', event);
    }
};

defineExpose({ buttonRef });
</script>
