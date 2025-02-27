import degit from 'degit';
import { logger } from './logger';

export async function downloadTemplate(repo: string, targetDir: string) {
    try {
        const emitter = degit(repo, {
            cache: false,
            force: true,
            verbose: true
        });
        await emitter.clone(targetDir);
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error(`下载模板失败: ${error.message} (Repo: ${repo}, Target: ${targetDir})`);
        } else {
            logger.error('下载模板失败: 未知错误');
        }
        throw error;
    }
}
