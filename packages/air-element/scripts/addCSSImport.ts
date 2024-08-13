import { basename, dirname, join, relative, sep, posix } from 'path';
import type { NormalizedOutputOptions, OutputBundle } from 'rollup';
import { promisify } from 'util';
import fs from 'fs';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const fileExists = promisify(fs.exists);

async function generateCssImportStatements(jsFilePath: string, cssFilePath: string, baseCssFilePath: string): Promise<string> {
    const relativeCssPath = relative(dirname(jsFilePath), cssFilePath).split(sep).join(posix.sep);
    const relativeBaseCssPath = relative(dirname(jsFilePath), baseCssFilePath).split(sep).join(posix.sep);

    return `import '${relativeBaseCssPath}';\nimport '${relativeCssPath}';\n`;
}

async function updateJsFileWithCssImports(jsFilePath: string, cssImportStatements: string): Promise<void> {
    const jsFileContent = await readFile(jsFilePath, 'utf8');
    const updatedContent = cssImportStatements + jsFileContent;
    await writeFile(jsFilePath, updatedContent, 'utf8');
}

export async function addCSSImport() {
    return {
        name: 'add-css-import',
        async writeBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
            const outputDir = options.dir || '.';
            const cssDir = join(outputDir, 'assets');
            const baseCssFilePath = join(cssDir, 'base.css');

            if (!(await fileExists(baseCssFilePath))) {
                return;
            }

            for (const [fileName] of Object.entries(bundle)) {
                if (!fileName.includes('style')) {
                    continue;
                }

                const baseFileName = basename(fileName, '.mjs');
                const jsFilePath = join(outputDir, fileName);
                const cssFilePath = join(cssDir, `${baseFileName}.css`);

                if (await fileExists(cssFilePath)) {
                    const cssImportStatements = await generateCssImportStatements(jsFilePath, cssFilePath, baseCssFilePath);
                    await updateJsFileWithCssImports(jsFilePath, cssImportStatements);
                }
            }
        }
    };
}
