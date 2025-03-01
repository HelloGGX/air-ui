import type { CommandModule } from 'yargs';

const command: CommandModule = {
    command: 'add',
    describe: '添加物料组件',
    builder(yargs) {
        return yargs;
    },
    async handler() {
        return (await import('.')).factory();
    }
};



export default command;
