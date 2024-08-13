/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./packages/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: ['class', '[data-mode="dark"]'],
    theme: {
        extend: {
            colors: {
                // 定义节日主题颜色
                springFestival: {
                    primary: '#FF4B4B', // 春节主题的红色
                    secondary: '#FFD700' // 春节主题的金色
                },
                christmas: {
                    primary: '#007F0E', // 圣诞节的绿色
                    secondary: '#FF0000' // 圣诞节的红色
                },
                halloween: {
                    primary: '#FF7518', // 万圣节的橙色
                    secondary: '#1E1E1E' // 万圣节的黑色
                }
            },
            backgroundImage: {
                // 定义节日主题背景图片
                'spring-festival': "url('/images/spring-festival-bg.jpg')",
                'christmas': "url('/images/christmas-bg.jpg')",
                'halloween': "url('/images/halloween-bg.jpg')",
              },
        }
    },
    plugins: []
};
