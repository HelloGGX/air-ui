import fs from 'fs/promises';
import path from 'path';
import { config } from './config.ts';
import { logger } from './logger.js';

export class FileManager {
    async createComponent(name, type, templates) {
        const componentDir = path.join(config.paths.components, name.toLowerCase());

        await this.ensureDirectoryExists(componentDir);
        await this.writeFiles(componentDir, name, type, templates);

        if (type === 'component') {
            await this.updateAirblocks(name);
        }
    }

    async ensureDirectoryExists(dir) {
        try {
            await fs.access(dir);
            throw new Error('目录已存在');
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.mkdir(dir, { recursive: true });
            } else {
                throw error;
            }
        }
    }

    async writeFiles(dir, name, type, templates) {
        const typeConfig = config.types[type];

        for (const file of typeConfig.files) {
            const extension = config.fileExtensions[file] || file;
            const filename = `${name}.${extension}`;
            await fs.writeFile(path.join(dir, filename), templates[file], 'utf8');
            logger.success(`创建文件: ${filename}`);
        }
    }

    async updateAirblocks(name) {
        const exportLines = `
//${name.toLowerCase()} ------------------------------
export * from './${name.toLowerCase()}/${name}.vue';
export { default as ${name} } from './${name.toLowerCase()}/${name}.vue';\n`;

        await fs.appendFile(config.paths.airblocks, exportLines, 'utf8');
        logger.success(`更新 airblocks.js: ${name}`);
    }
}
