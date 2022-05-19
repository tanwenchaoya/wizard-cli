'use strict';
const log = require('@fighter-cli/log')
const Package = require('@fighter-cli/package')
const SETTING = {
    init: '@fighter-cli/init'
}
function exec() {
    const targetPath = process.env.CLI_TARGET_PATH
    const homePath = process.env.CLI_HOME_PATH
    log.verbose('targetPath: ', targetPath)
    log.verbose('homePath: ', homePath)
    const cmdObj = arguments[arguments.length - 1]
    const cmdName = cmdObj.name()
    const packageName = SETTING[cmdName]
    const packageVersion = 'latest'

    const pkg = new Package({
        targetPath,
        packageName,
        packageVersion
    })
console.log(pkg.getRootFile())
}

module.exports = exec;

