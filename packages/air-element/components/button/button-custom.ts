import { computed } from 'vue';
import Color from 'color';
import type { ButtonProps } from './Button';

export function useButtonCustomStyle(props: ButtonProps) {
    const buttonStyle = computed(() => {
        const color = props.color;
        const _disabled = props.disabled;
        const _plain = props.plain;
        if (!color) return {};

        const baseColor = Color(color);
        const lightColor = baseColor?.lighten(0.2).hex();
        const darkColor = baseColor?.darken(0.1).hex();

        const styles: Record<string, string> = {
            '--air-btn-bg-color': color,
            '--air-btn-text-color': baseColor?.isLight() ? '#000000' : '#ffffff',
            '--air-btn-border-color': color,
            '--air-btn-hover-bg-color': lightColor,
            '--air-btn-hover-text-color': baseColor?.isLight() ? '#000000' : '#ffffff',
            '--air-btn-hover-border-color': lightColor,
            '--air-btn-active-bg-color': darkColor,
            '--air-btn-active-border-color': darkColor
        };
        const disabledButtonColor = baseColor.lighten(0.3).hex();
        // 仅在禁用状态时添加禁用相关的颜色变量
        if (_disabled) {
            styles['--air-btn-disabled-bg-color'] = disabledButtonColor;
            styles['--air-btn-disabled-text-color'] = 'var(--color-white-800)';
            styles['--air-btn-disabled-border-color'] = disabledButtonColor;
        }

        if (_plain) {
            styles['--air-btn-bg-color'] = 'var(--air-btn-bg-default)';
            styles['--air-btn-text-color'] = String(baseColor);
            styles['--air-btn-border-color'] = String(baseColor);

            styles['--air-btn-disabled-bg-color'] = 'var(--color-white-800)';
            styles['--air-btn-disabled-text-color'] = disabledButtonColor;
            styles['--air-btn-disabled-border-color'] = disabledButtonColor;
        }

        return styles;
    });

    return { buttonStyle };
}
