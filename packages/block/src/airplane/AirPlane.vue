<template>
  <div class="bg-white rounded-lg p-4 flex items-center justify-between max-w-4xl mx-auto h-96">
    <div class="flex-1 h-full mr-3 rounded-sm border border-gray-300 p-1">
      <!-- 顶部座位介绍 -->
      <div class="h-9 flex justify-center items-center py-1 text-sm text-gray-500">
        <div class="flex items-center justify-center text-sm mr-4">
          <AirSeat status="unavailable" />
          <span class="ml-1">不可选</span>
        </div>
        <div class="flex items-center justify-center text-sm mr-4">
          <AirSeat status="available" />
          <span class="ml-1">可选</span>
        </div>
        <div class="flex items-center justify-center text-sm mr-4">
          <AirSeat status="selected" />
          <span class="ml-1">已选</span>
        </div>
        <div class="flex items-center justify-center text-sm mr-4">
          <AirSeat status="emergency-left" />
          <span class="ml-1">紧急出口</span>
        </div>
      </div>
      <!-- 字母标志 -->
      <div></div>
      <!-- 座位分布 -->
      <div class="px-7 text-gray-500 mt-2 h-4/5 overflow-y-scroll">
        <div class="flex items-center justify-center">
          <AirSeat class="px-2" v-for="(item, index) in airSeats" :key="item.seatNumber" v-bind="item"  @click="handleSeats"/>
          <!-- <AirSeat class="px-2" status="selected" />
          <AirSeat class="px-2" status="selected" />
          <AirSeat class="px-2" status="selected" />
          <span class="px-2">31</span>
          <AirSeat class="px-2" status="selected" />
          <AirSeat class="px-2" status="selected" />
          <AirSeat class="px-2" status="selected" />
          <span class="px-2">31</span>
          <AirSeat class="px-2" status="selected" />
          <AirSeat class="px-2" status="selected" />
          <AirSeat class="px-2" status="selected" /> -->
        </div>
      </div>
    </div>
    <!-- 右侧飞机 -->
    <div class="flex flex-col justify-center items-center">
      <button class="w-12 h-12 rounded-full bg-primary-200 flex justify-center content-center flex-wrap">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_20_7568)">
          <path d="M12.0002 10.828L7.05023 15.778L5.63623 14.364L12.0002 8L18.3642 14.364L16.9502 15.778L12.0002 10.828Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_20_7568">
          <rect class="w-6 h-6" fill="white"/>
          </clipPath>
          </defs>
        </svg>
      </button>
      <div class="rounded-lg bg-primary-100 my-4 w-20 h-48 relative">
        <div class="absolute bottom-0">        
          <svg class="w-20 h-44" viewBox="0 0 80 172" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M65.8488 107.131H63.4834V109.809L64.74 111.854L65.8488 109.809V107.131Z" fill="white" stroke="#2C5DE5" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M72.1384 170.072L46.3073 153.731L42.3022 171.843L74.9338 180.617L72.1384 170.072Z" fill="url(#paint0_linear_20_7572)"/>
          <path d="M7.89677 170.099L33.7279 153.758L37.7329 171.87L5.10131 180.644L7.89677 170.099Z" fill="url(#paint1_linear_20_7572)"/>
          <path d="M17.0895 107.131H14.7241V109.809L15.9807 111.854L17.0895 109.809V107.131Z" fill="white" stroke="#2C5DE5" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
          <g filter="url(#filter0_d_20_7572)">
          <path d="M78.5225 85.4532L136.477 118.151L139.998 130.091L67.1011 107.364H51.5556V137.968C51.5556 141.912 44.5761 189.297 40.0066 189.297C35.4371 189.297 28.4576 141.912 28.4576 137.968V107.364H12.9121L-59.9849 130.091L-56.4637 118.151L1.49068 85.4532L24.862 73.4461L24.9039 73.4201C26.3142 72.545 28.4576 71.2149 28.4576 67.293V45.3727V28.0243C28.4576 19.7559 37.9369 5.91036 40.0066 5.96402C42.0764 6.01769 51.5556 19.7559 51.5556 28.0243V45.3727V67.293C51.5556 71.3964 53.9418 72.7848 55.1512 73.4461L78.5225 85.4532Z" fill="url(#paint2_linear_20_7572)" shape-rendering="crispEdges"/>
          <path d="M51.5556 67.293C51.5556 71.3964 53.9418 72.7848 55.1512 73.4461L78.5225 85.4532L136.477 118.151L139.998 130.091L67.1011 107.364H51.5556M51.5556 67.293V45.3727C51.5556 45.3727 51.5556 36.2927 51.5556 28.0243C51.5556 19.7559 42.0764 6.01769 40.0066 5.96402C37.9369 5.91036 28.4576 19.7559 28.4576 28.0243V45.3727V67.293M51.5556 67.293V107.364M51.5556 107.364C51.5556 107.364 51.5556 134.024 51.5556 137.968C51.5556 141.912 44.5761 189.297 40.0066 189.297C35.4371 189.297 28.4576 141.912 28.4576 137.968V107.364M28.4576 67.293C28.4576 71.254 26.2713 72.5712 24.862 73.4461L1.49068 85.4532L-56.4637 118.151L-59.9849 130.091L12.9121 107.364H28.4576M28.4576 67.293V107.364" stroke="#2C5DE5" stroke-width="0.25" shape-rendering="crispEdges"/>
          </g>
          <path d="M8.92188 81.821L9.77797 83.7011L27.0282 75.5824V71.73" stroke="#2C5DE5" stroke-width="0.25"/>
          <path d="M71.5879 81.8207L70.7318 83.7009L53.4816 75.5822V72.292" stroke="#2C5DE5" stroke-width="0.25"/>
          <path d="M51.5376 107.424V105.039H67.0589L139.203 127.766" stroke="#2C5DE5" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M67.166 105.065L67.7842 103.16L78.321 106.594L77.7027 108.365" stroke="#2C5DE5" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.8696 105.012L12.2514 103.106L1.71467 106.541L2.3329 108.312" stroke="#2C5DE5" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M28.4326 107.427V105.039H12.9501L-59.1943 127.766" stroke="#2C5DE5" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
          <filter id="filter0_d_20_7572" x="-77.3514" y="0.930154" width="234.716" height="217.944" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="12.2718"/>
          <feGaussianBlur stdDeviation="8.59025"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.205382 0 0 0 0 0.351839 0 0 0 0 0.758333 0 0 0 0.12 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_20_7572"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_20_7572" result="shape"/>
          </filter>
          <linearGradient id="paint0_linear_20_7572" x1="62.9741" y1="169.941" x2="43.8625" y2="165.347" gradientUnits="userSpaceOnUse">
          <stop stop-color="white"/>
          <stop offset="1" stop-color="white" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="paint1_linear_20_7572" x1="17.0611" y1="169.968" x2="36.1727" y2="165.374" gradientUnits="userSpaceOnUse">
          <stop stop-color="white"/>
          <stop offset="1" stop-color="white" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="paint2_linear_20_7572" x1="3.68087" y1="84.6256" x2="67.5251" y2="84.6256" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" stop-opacity="0.78"/>
          <stop offset="0.141828" stop-color="white" stop-opacity="0.232908"/>
          <stop offset="0.376434" stop-color="white" stop-opacity="0"/>
          <stop offset="0.531421" stop-color="white" stop-opacity="0.38"/>
          <stop offset="0.617046" stop-color="white"/>
          <stop offset="0.660732" stop-color="white"/>
          <stop offset="0.720176" stop-color="white"/>
          <stop offset="0.767985" stop-color="white" stop-opacity="0.38"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          </defs>
          </svg>
        </div>
        <div class="absolute left-1 right-1 top-7 h-10 border-2 border-slate-50 rounded-sm"></div>
      </div>
      <button class="w-12 h-12 rounded-full bg-primary-500 flex justify-center content-center flex-wrap">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_20_7597)">
          <path d="M12.0002 13.1719L16.9502 8.22192L18.3642 9.63592L12.0002 15.9999L5.63623 9.63592L7.05023 8.22192L12.0002 13.1719Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_20_7597">
          <rect class="w-6 h-6" fill="white"/>
          </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AirSeat from 'block/airseat/AirSeat.vue';

interface IAirSeats {
  seatNumber: number,
  status: 'available' | 'selected' | 'unavailable' | 'emergency-left' | 'emergency-right',
}

defineOptions({ name: 'AirPlane' });
const airplaneRef = ref<HTMLElement>();

const choosedSeats = ref([]); // 存取选中的座位

const props = defineProps({
  airSeats: {
    type: Array<IAirSeats>,
    default: () => []
  }
});
const emit = defineEmits<{
    (e: 'chooseSeat'): void;
}>();

const handleSeats = (evt: any) => {
  console.log(evt.status)
  console.log(evt.seatNumber)
} 
// 处理点击事件
// const handleClick = (event: MouseEvent) => {
//   emit('click', event);
// };

defineExpose({ airplaneRef, choosedSeats });

</script>
