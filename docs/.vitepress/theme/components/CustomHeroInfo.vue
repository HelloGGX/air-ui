<template>
    <div class="relative mx-auto mt-16 grid w-full max-w-container grid-cols-1 px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-32">
        <div class="col-start-1 row-start-1 h-7 text-base font-semibold leading-7 text-sky-500" aria-hidden="true">
            By the makers of Air-element
        </div>
        <h1
            class="col-start-1 row-start-2 mt-4 max-w-[36rem] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-7xl xl:max-w-[43.5rem]">
            {{ name }}
        </h1>
        <p class="col-start-1 row-start-3 mt-4 max-w-lg text-lg text-slate-700">{{ text }}</p>
        
    </div>
</template>

<script setup>
import { useData } from 'vitepress';

const { frontmatter } = useData();
const { name, text, actions } = frontmatter.value.hero;
</script>
