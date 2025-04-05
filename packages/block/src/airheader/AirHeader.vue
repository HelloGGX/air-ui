<template>
    <div id="airheader" class="w-full flex justify-between items-center">
        <div>
            <!--logo区域-->
            Logo
        </div>
        <div class="p-4 flex gap-6 items-center">
            <span class="text-lg text-gray-600">{{ formattedTime }}</span>
            <div>
                <span class="text-primary-600 text-3xl">{{ props.countdownNumber }}</span
                ><span class="text-primary-600 text-xl">s</span>
            </div>
            <button>退出</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

defineOptions({ name: 'AirHeader' });

const airheaderRef = ref<HTMLElement>();
const currentTime = ref(new Date());
let intervalId: ReturnType<typeof setInterval>;

const formattedTime = computed(() => {
    return currentTime.value.toISOString().slice(0, 10) + ' ' + currentTime.value.toTimeString().slice(0, 5);
});

const updateTime = () => {
    currentTime.value = new Date();
};

onMounted(() => {
    updateTime(); // 初始化时间
    intervalId = setInterval(updateTime, 1000); // 每秒更新
});

onBeforeUnmount(() => {
    clearInterval(intervalId); // 清理定时器
});

const props = defineProps({
    countdownNumber: {
        type: Number,
        default: 0
    }
});

defineExpose({ airheaderRef });
</script>
