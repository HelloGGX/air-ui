import path from 'path';
import { removeBuild, resolvePath, updatePackageJson } from '../../../scripts/build-helper';

removeBuild(import.meta.url);
updatePackageJson(path.resolve(resolvePath(import.meta.url).__dirname, '../package.json'));
