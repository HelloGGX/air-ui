import Header from './Header.vue';

export default {
  title: 'BLOCK/Header',
  component: Header,
  argTypes: {
    title: { control: 'text' }
  }
};

const Template = (args) => ({
  components: { Header },
  setup() {
    return { args };
  },
  template: '<Header v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'My Application',
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'Custom Title',
};
