// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import GetStarted from "./components/GetStarted.vue";
import CustomHeroImg from './components/CustomHeroImg.vue'
import CustomHeroInfo from './components/CustomHeroInfo.vue'
import DefaultTheme from 'vitepress/theme'
import './styles/index.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "home-hero-image": () => h(CustomHeroImg),
      "home-hero-info": () => h(CustomHeroInfo),
      "home-features-after": () => h(GetStarted),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
   
  }
} satisfies Theme
