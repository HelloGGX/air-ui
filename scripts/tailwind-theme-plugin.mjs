// plugins/tailwind-theme-plugin.js

export default function ({ addBase, theme }) {
    const themes = theme('airui.themes', []);
  
    themes.forEach((themeName) => {
      addBase({
        [`[data-theme='${themeName}']`]: {
          '--color-primary': theme(`airui.colors.${themeName}.primary`, '#000'),
          '--color-secondary': theme(`airui.colors.${themeName}.secondary`, '#000'),
          '--bg-image': `url(${theme(`airui.backgrounds.${themeName}`, 'none')})`,
        },
      });
    });
  };
  