'use strict';
const path = require('path');
const { isObject } = require('@fighter-cli/utils')
const formatPath = require('@fighter-cli/format-path');
// import {packageDirectory} from 'pkg-dir';
const pkgDir = require('pkg-dir').sync
class Package {
    constructor(options) {
        if (!options || !isObject(options)) {

            throw new Error('options must be provided and is Object');
        }
        //package路劲
        this.targetPath = options.targetPath
        //存储路径
        this.storePath = options.storePath
        this.packageName = options.packageName
        this.packageVersion = options.packageVersion


    }
    exists(name) {
    }
    install() {

    }
    update() { }
    getRootFile() {
        const dir = pkgDir(this.targetPath)
        if (dir) {
            const pkgFile = require(path.resolve(dir, 'package.json'))
            if (pkgFile && pkgFile.main) {
                return formatPath(path.resolve(dir, pkgFile.main))
            }
        }
        return null
        console.log(dir)
    }

}

module.exports = Package;
