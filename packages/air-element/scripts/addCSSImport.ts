import { basename, dirname, join, relative } from 'path';
import type { NormalizedOutputOptions, OutputBundle } from 'rollup';
import { promisify } from 'util';
import fs from 'fs';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

export async function addCSSImport() {
    return {
        name: 'add-css-import',
        async writeBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
            const outputDir = options.dir || '.';
            for (const [fileName] of Object.entries(bundle)) {
                const regex = /^components\/[^/]+\/style\/[^/]+\.mjs$/;
                if (regex.test(fileName)) {
                    const baseFileName = basename(fileName, '.mjs');
                    const jsFilePath = join(outputDir, fileName);
                    const cssFilePath = join(outputDir, 'assets', `${baseFileName}.css`);
                    const baseCssFilePath = join(outputDir, 'assets', 'base.css');

                    if ((await exists(cssFilePath)) && (await exists(baseCssFilePath))) {
                        let jsFileContent = await readFile(jsFilePath, 'utf8');
                        let cssImportStatements = '';

                        const relativeCssPath = relative(dirname(jsFilePath), cssFilePath);
                        const relativeBaseCssPath = relative(dirname(jsFilePath), baseCssFilePath);
                        cssImportStatements += `import '${relativeBaseCssPath}';\n`;
                        cssImportStatements += `import '${relativeCssPath}';\n`;

                        jsFileContent = cssImportStatements + jsFileContent;

                        await writeFile(jsFilePath, jsFileContent, 'utf8');
                    }
                }
            }
        }
    };
}
