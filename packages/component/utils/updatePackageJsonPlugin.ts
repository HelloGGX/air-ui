import fs from 'fs-extra';
import { resolve } from 'path';

function updatePackageJson(inputDir: string, outputDir: string) {
  try {
    const packageJsonPath = resolve(outputDir, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      fs.copySync(resolve(inputDir, './package.json'), packageJsonPath);
    }

    const pkg = JSON.parse(
      fs.readFileSync(packageJsonPath, { encoding: 'utf8', flag: 'r' }),
    );
    // Remove scripts field
    delete pkg.scripts;

    // Update main, module, and types fields
    pkg.main = 'es/index.mjs';
    pkg.module = 'es/index.mjs';
    pkg.types = 'types/index.d.ts';

    // Update exports field
    pkg.exports = {
      '.': {
        types: './es/index.d.ts',
        import: './es/index.mjs',
        require: './umd/index.js',
      },
      './es': {
        types: './es/index.d.ts',
        import: './es/index.mjs',
      },
      './es/*/*.mjs': {
        types: './types/*/*.d.ts',
        import: './es/*/*.mjs',
      },
      './es/*': {
        types: ['./types/*/*.d.ts', './types/*/index.d.ts'],
        import: './es/*.mjs',
      },
      './*': './*',
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 4));
    console.log('package.json updated successfully');
  } catch (error) {
    console.error('Failed to update package.json:', error);
  }
}

export function updatePackageJsonPlugin({
  input,
  output,
}: {
  input: string;
  output: string;
}) {
  return {
    name: 'update-package-json',
    buildStart() {
      updatePackageJson(input, output);
    },
  };
}
