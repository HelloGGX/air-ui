/** @type { import('@storybook/vue3').Preview } */
import '@air-element/theme/index.scss';
import '../theme/festival/index.scss';

import { withThemeByDataAttribute } from '@storybook/addon-themes';

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },

    globalTypes: {
        locale: {
            description: 'Internationalization locale',
            defaultValue: 'zh',
            toolbar: {
                icon: 'globe',
                items: [
                    { value: 'en', right: '🇺🇸', title: 'English' },
                    { value: 'zh', right: '🇨🇳', title: '中文' }
                ]
            }
        }
    },

    decorators: [
        withThemeByDataAttribute({
            themes: {
                ['春节']: 'springFestival',
                ['圣诞节']: 'christmas',
                ['万圣节']: 'halloween'
            },
            defaultTheme: '春节',
            dataAttribute: 'data-theme'
        })
    ]
};

export default preview;
