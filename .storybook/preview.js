/** @type { import('@storybook/vue3').Preview } */
import '../theme/index.scss';

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
                ['立夏']: 'summer',
                ['情人节']: 'love',
            },
            defaultTheme: '立夏',
            dataAttribute: 'data-theme'
        })
    ]
};

export default preview;
