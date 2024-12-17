<template>
    <div class="bg-white rounded-lg p-4 flex items-center justify-between max-w-4xl mx-auto h-96">
        <!-- 左侧座位显示区 -->
        <div class="flex-1 h-full mr-3 rounded-sm border border-gray-300 p-1">
            <!-- 座位状态介绍 -->
            <div class="h-9 flex justify-center items-center py-1 text-sm text-gray-500">
                <div v-for="(statusInfo, idx) in seatStatusList" :key="idx"
                    class="flex items-center justify-center text-sm mr-4">
                    <AirSeat :status="statusInfo.status" />
                    <span class="ml-1">{{ statusInfo.label }}</span>
                </div>
            </div>

            <!-- 座位选择区域 -->
            <div class="px-7 text-gray-500 mt-2 h-4/5 overflow-y-scroll scroll-smooth" ref="planeSeatRef">
                <div class="flex items-center justify-center flex-wrap">
                    <AirSeat v-for="(item, index) in airSeats" :key="item.seatNumber" class="mx-2" v-bind="item"
                        @click="handleSeatClick(item)" />
                </div>
            </div>
        </div>

        <!-- 右侧机身滚动控制区 -->
        <div class="flex flex-col justify-center items-center">
            <!-- 向上按钮 -->
            <button @mousedown="startScroll('up')" @mouseup="stopScroll" @mouseleave="stopScroll"
                @touchstart="startScroll('up')" @touchend="stopScroll" :class="[
                    'w-12 h-12 rounded-full flex justify-center items-center',
                    upActive ? 'bg-primary-500' : 'bg-primary-200'
                ]">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414-4.95-4.95z" fill="white" />
                </svg>
            </button>

            <!-- 可拖动机身图标 -->
            <div class="rounded-lg bg-primary-100 my-4 w-20 h-48 relative" ref="scrollContainerRef">
                <div class="absolute bottom-0" ref="scrollPlaneRef">
                    <!-- 这里是飞机示意图的SVG -->
                    <svg class="w-20 h-44" viewBox="0 0 80 172" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M65.8488 107.131H63.4834V109.809L64.74 111.854L65.8488 109.809V107.131Z" fill="white"
                            stroke="#2C5DE5" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M72.1384 170.072L46.3073 153.731L42.3022 171.843L74.9338 180.617L72.1384 170.072Z"
                            fill="url(#paint0_linear_20_7572)" />
                        <path d="M7.89677 170.099L33.7279 153.758L37.7329 171.87L5.10131 180.644L7.89677 170.099Z"
                            fill="url(#paint1_linear_20_7572)" />
                        <path d="M17.0895 107.131H14.7241V109.809L15.9807 111.854L17.0895 109.809V107.131Z" fill="white"
                            stroke="#2C5DE5" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                        <g filter="url(#filter0_d_20_7572)">
                            <path
                                d="M78.5225 85.4532L136.477 118.151L139.998 130.091L67.1011 107.364H51.5556V137.968C51.5556 141.912 44.5761 189.297 40.0066 189.297C35.4371 189.297 28.4576 141.912 28.4576 137.968V107.364H12.9121L-59.9849 130.091L-56.4637 118.151L1.49068 85.4532L24.862 73.4461L24.9039 73.4201C26.3142 72.545 28.4576 71.2149 28.4576 67.293V45.3727V28.0243C28.4576 19.7559 37.9369 5.91036 40.0066 5.96402C42.0764 6.01769 51.5556 19.7559 51.5556 28.0243V45.3727V67.293C51.5556 71.3964 53.9418 72.7848 55.1512 73.4461L78.5225 85.4532Z"
                                fill="url(#paint2_linear_20_7572)" shape-rendering="crispEdges" />
                            <path
                                d="M51.5556 67.293C51.5556 71.3964 53.9418 72.7848 55.1512 73.4461L78.5225 85.4532L136.477 118.151L139.998 130.091L67.1011 107.364H51.5556M51.5556 67.293V45.3727C51.5556 45.3727 51.5556 36.2927 51.5556 28.0243C51.5556 19.7559 42.0764 6.01769 40.0066 5.96402C37.9369 5.91036 28.4576 19.7559 28.4576 28.0243V45.3727V67.293M51.5556 67.293V107.364M51.5556 107.364C51.5556 107.364 51.5556 134.024 51.5556 137.968C51.5556 141.912 44.5761 189.297 40.0066 189.297C35.4371 189.297 28.4576 141.912 28.4576 137.968V107.364M28.4576 67.293C28.4576 71.254 26.2713 72.5712 24.862 73.4461L1.49068 85.4532L-56.4637 118.151L-59.9849 130.091L12.9121 107.364H28.4576M28.4576 67.293V107.364"
                                stroke="#2C5DE5" stroke-width="0.25" shape-rendering="crispEdges" />
                        </g>
                        <path d="M8.92188 81.821L9.77797 83.7011L27.0282 75.5824V71.73" stroke="#2C5DE5"
                            stroke-width="0.25" />
                        <path d="M71.5879 81.8207L70.7318 83.7009L53.4816 75.5822V72.292" stroke="#2C5DE5"
                            stroke-width="0.25" />
                        <path d="M51.5376 107.424V105.039H67.0589L139.203 127.766" stroke="#2C5DE5" stroke-width="0.25"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M67.166 105.065L67.7842 103.16L78.321 106.594L77.7027 108.365" stroke="#2C5DE5"
                            stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.8696 105.012L12.2514 103.106L1.71467 106.541L2.3329 108.312" stroke="#2C5DE5"
                            stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M28.4326 107.427V105.039H12.9501L-59.1943 127.766" stroke="#2C5DE5" stroke-width="0.25"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <defs>
                            <filter id="filter0_d_20_7572" x="-77.3514" y="0.930154" width="234.716" height="217.944"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="12.2718" />
                                <feGaussianBlur stdDeviation="8.59025" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix"
                                    values="0 0 0 0 0.205382 0 0 0 0 0.351839 0 0 0 0 0.758333 0 0 0 0.12 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_20_7572" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_20_7572"
                                    result="shape" />
                            </filter>
                            <linearGradient id="paint0_linear_20_7572" x1="62.9741" y1="169.941" x2="43.8625"
                                y2="165.347" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" />
                                <stop offset="1" stop-color="white" stop-opacity="0" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_20_7572" x1="17.0611" y1="169.968" x2="36.1727"
                                y2="165.374" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" />
                                <stop offset="1" stop-color="white" stop-opacity="0" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_20_7572" x1="3.68087" y1="84.6256" x2="67.5251"
                                y2="84.6256" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" stop-opacity="0.78" />
                                <stop offset="0.141828" stop-color="white" stop-opacity="0.232908" />
                                <stop offset="0.376434" stop-color="white" stop-opacity="0" />
                                <stop offset="0.531421" stop-color="white" stop-opacity="0.38" />
                                <stop offset="0.617046" stop-color="white" />
                                <stop offset="0.660732" stop-color="white" />
                                <stop offset="0.720176" stop-color="white" />
                                <stop offset="0.767985" stop-color="white" stop-opacity="0.38" />
                                <stop offset="1" stop-color="white" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div class="top-4 relative" ref="scrollBoxContainer">
                    <div class="absolute left-1 right-1 h-10 border-2 border-pink-500 rounded-sm scroll-smooth"
                        ref="scrollBoxRef" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
                    </div>
                </div>
            </div>

            <!-- 向下按钮 -->
            <button @mousedown="startScroll('down')" @mouseup="stopScroll" @mouseleave="stopScroll"
                @touchstart="startScroll('down')" @touchend="stopScroll" :class="[
                    'w-12 h-12 rounded-full flex justify-center items-center',
                    downActive ? 'bg-primary-500' : 'bg-primary-200'
                ]">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16l-6.364-6.364 1.414-1.414 4.95 4.95z" fill="white" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import AirSeat from '@air-ui/block/airseat';
import type { AirSeatProps } from '@air-ui/block/airseat';

defineOptions({ name: 'AirPlane' });

// Props
const props = defineProps<{ airSeats: AirSeatProps[] }>();
const emit = defineEmits(['chooseSeat']);

// Refs
const planeSeatRef = ref<HTMLElement | null>(null);
const scrollPlaneRef = ref<HTMLElement | null>(null);
const scrollBoxRef = ref<HTMLElement | null>(null);
const scrollContainerRef = ref<HTMLElement | null>(null);
// State
const choosedSeats = ref<AirSeatProps[]>([]);
const isScrolling = ref(false);
const isTouching = ref(false);
const upActive = ref(false);
const downActive = ref(true);
let startTouchY = 0;
let initialTop = 0;
let animationFrameId: number | null = null;

// Helper Functions
// 模拟多个座位
const airSeats = computed<AirSeatProps[]>(() => {
    const seats: AirSeatProps[] = [];
    for (let i = 0; i < 200; i++) {
        const seatNumber = Math.floor(Math.random() * 5) + 1; // 随机座位号 1-5
        const statusOptions = ['available', 'selected', 'unavailable'] as const;
        const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
        seats.push({ seatNumber, status, seatOwnerIndex: Math.floor(Math.random() * 2) });
    }
    return seats;
});


const seatStatusList = [
    { status: 'unavailable', label: '不可选' },
    { status: 'available', label: '可选' },
    { status: 'selected', label: '已选' },
    { status: 'emergency-left', label: '紧急出口' },
];

/**
 * 选择座位事件
 */
function handleSeatClick(seat: AirSeatProps) {
    choosedSeats.value = seat.status === 'selected'
        ? [...choosedSeats.value, seat]
        : choosedSeats.value.filter((item) => item.seatNumber !== seat.seatNumber);
    emit('chooseSeat', choosedSeats.value);
}

/**
 * 同步红框位置
 */
function syncRedBox() {
    if (isTouching.value) return; // 如果正在触摸滑动红框，跳过同步
    if (!planeSeatRef.value || !scrollPlaneRef.value || !scrollBoxRef.value) return;

    const seatEl = planeSeatRef.value;
    const totalScroll = seatEl.scrollHeight - seatEl.clientHeight;
    const ratio = totalScroll > 0 ? seatEl.scrollTop / totalScroll : 0;

    const maxTop = scrollPlaneRef.value.offsetHeight - scrollBoxRef.value.offsetHeight;
    const newTop = Math.min(Math.max(ratio * maxTop, 0), maxTop);

    scrollBoxRef.value.style.top = `${newTop}px`;
    updateButtonState(newTop);
}

/**
 * 更新按钮状态
 */
function updateButtonState(newTop: number) {
    if (!scrollPlaneRef.value || !scrollBoxRef.value) return;
    const maxTop = scrollPlaneRef.value.offsetHeight - scrollBoxRef.value.offsetHeight;

    upActive.value = newTop > 0;
    downActive.value = newTop < maxTop;
}
/**
 * 红框触摸开始
 */
function onTouchStart(e: TouchEvent) {
    if (!scrollBoxRef.value) return;
    startTouchY = e.touches[0].clientY;
    initialTop = scrollBoxRef.value.offsetTop || 0;
    isTouching.value = true;
}

/**
 * 红框触摸移动
 */
function onTouchMove(e: TouchEvent) {
    if (animationFrameId) return; // 如果已有触发，跳过本次
    animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null; // 重置触发状态
        if (!isTouching.value || !scrollBoxRef.value || !scrollPlaneRef.value || !planeSeatRef.value) return;

        const deltaY = e.touches[0].clientY - startTouchY;
        const maxTop = scrollPlaneRef.value.offsetHeight - scrollBoxRef.value.offsetHeight;
        const newTop = Math.min(Math.max(initialTop + deltaY, 0), maxTop);

        scrollBoxRef.value.style.top = `${newTop}px`;

        const ratio = parseFloat((newTop / maxTop).toFixed(6)); // 舍入到 6 位小数
        const totalScroll = planeSeatRef.value.scrollHeight - planeSeatRef.value.clientHeight;
        planeSeatRef.value.scrollTo({ top: ratio * totalScroll, behavior: 'smooth' });
        updateButtonState(newTop)
    });
}

/**
 * 红框触摸结束
 */
function onTouchEnd() {
    isTouching.value = false;
}

/**
 * 平滑滚动
 */
function smoothScroll(direction: 'up' | 'down') {
    if (!planeSeatRef.value) return;
    const scrollAmount = 40;
    planeSeatRef.value.scrollTop += direction === 'up' ? -scrollAmount : scrollAmount;
    syncRedBox();

    if (isScrolling.value) {
        requestAnimationFrame(() => smoothScroll(direction));
    }
}

function startScroll(direction: 'up' | 'down') {
    isScrolling.value = true;
    smoothScroll(direction);
}

function stopScroll() {
    isScrolling.value = false;
}

// Lifecycle Hooks
onMounted(() => {
    const planeEl = scrollPlaneRef.value;
    if (planeSeatRef.value) planeSeatRef.value.addEventListener('scroll', syncRedBox);
    if (planeEl) {
        planeEl.addEventListener('touchstart', (e: TouchEvent) => e.preventDefault(), { passive: false });
    }
});

onUnmounted(() => {
    if (planeSeatRef.value) planeSeatRef.value.removeEventListener('scroll', syncRedBox);
});

defineExpose({ choosedSeats });
</script>
