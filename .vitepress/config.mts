import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'air ui',
    description: '一个Vue3的PC端组件库',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: '指南', link: '/docs/guild/installation' },
            { text: '组件', link: '/docs/components/apiSelect' },
            { text: 'API', link: '/docs/api/index' }
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],
        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
        search: {
            // 开启搜索
            provider: 'local'
        }
    }
});
