/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

import type {TransformedCodeFile} from '../types.flow';
import type ModuleCache from './ModuleCache';

module.exports = class Module {
  hasteID: ?string;
  moduleCache: ModuleCache;
  name: string;
  path: string;

  constructor(
    path: string,
    moduleCache: ModuleCache,
    info: TransformedCodeFile,
  ) {
    this.hasteID = info.hasteID;
    this.moduleCache = moduleCache;
    this.name = this.hasteID || getName(path);
    this.path = path;
  }

  getPackage() {
    return this.moduleCache.getPackageOf(this.path);
  }

  isHaste() {
    return Boolean(this.hasteID);
  }
};

function getName(path) {
  return path.replace(/^.*[\/\\]node_modules[\///]/, '');
}
