import type { TemplateFunction } from '../../utils/types';

const templateFn: TemplateFunction = function ({ name: componentName }) {
    componentName = componentName.replace(/-(.)/g, (_, $1) => $1.toUpperCase());

    return {
        filename: 'index.ts',
        contents: `import { App } from 'vue';
import ${componentName} from './${componentName}.vue';

export { ${componentName}Props } from './interface';

export { ${componentName} };

export default {
  install: (app: App) => {
    app.component(${componentName}.name, ${componentName});
  }
};
`
    };
};

export default templateFn;
