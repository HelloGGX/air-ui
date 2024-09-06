import { TemplateFunction } from '../../../../types';

const templateFn: TemplateFunction = function ({ name: componentName }) {
    componentName = componentName.replace(/-(.)/g, (_, $1) => $1.toUpperCase());

    return {
        filename: 'index.test.ts',
        contents: `import { render } from '@testing-library/vue';
import { expect } from 'vitest';
import '@testing-library/jest-dom';
import { ${componentName} } from '../index';

describe('${componentName}', () => {
    it('renders the component', () => {
        const { container } = render(${componentName});
        expect(container).toBeInTheDocument();
    });
});
`
    };
};

export default templateFn;
