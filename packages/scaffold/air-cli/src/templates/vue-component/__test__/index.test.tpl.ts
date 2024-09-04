import type { TemplateFunction } from '../../../utils/types';

const templateFn: TemplateFunction = function ({ name: componentName }) {
    componentName = componentName.replace(/-(.)/g, (_, $1) => $1.toUpperCase());

    return {
        filename: 'index.test.js',
        contents: `import { mount } from '@vue/test-utils';
import ${componentName} from '../src/${componentName}.vue';

describe('${componentName}', () => {
  it('renders correctly', () => {
    const wrapper = mount(${componentName});
    expect(wrapper.html()).toMatchSnapshot();
  });

  // Add more tests here
});
`
    };
};

export default templateFn;
