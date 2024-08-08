import AirHeader from './AirHeader.vue';

export default {
    title: 'BLOCK/Header',
    component: AirHeader,
    argTypes: {
        title: { control: 'text' }
    }
};

const Template = (args) => ({
    components: { AirHeader },
    setup() {
        return { args };
    },
    template: '<AirHeader v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
    title: 'My Application'
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
    title: 'Custom Title'
};
