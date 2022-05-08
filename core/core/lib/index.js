module.exports = core;
const path = require('path');
const semver = require('semver');
const colors = require('colors/safe');
const pkg = require('../package.json')
const log = require('@fighter-cli/log')
const userHome = require('user-home')
const pathExists = require('path-exists').sync

const constant = require('./const')
let args, config;
function core() {
    try {
        checkPkgVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHome()
        checkInputArgs()
        checkEnv()
        checkGlobalUpdate()
        log.verbose('debug', 'core')
    } catch (e) {
        log.error(e.message)
    }
}
function checkGlobalUpdate() {
    //1.获取当前版本号和
}
function checkEnv() {
    const dotenv = require('dotenv')
    const dotenvPath = path.resolve(userHome, '.env')
    if (pathExists(dotenvPath)) {
        dotenv.config({
            path: path.resolve(userHome, '.env')
        })
    }
    createDefaultConfig()
    log.verbose('环境变量', process.env.CLI_HOME_PATH)
}
function createDefaultConfig() {
    const cliConfig = {
        home: userHome,
    }
    if (process.env.CLI_HOME) {
        cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME)
    } else {
        cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME)
    }
    process.env.CLI_HOME_PATH = cliConfig.cliHome
}
function checkInputArgs() {
    args = require('minimist')(process.argv.slice(2))
    checkArgs()
}
function checkArgs() {
    if (args.debug) {
        process.env.LOG_LEVEL = 'verbose'
    } else {
        process.env.LOG_LEVEL = 'info'

    }
    log.level = process.env.LOG_LEVEL
}
function checkUserHome() {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red('User not found'))
    }
    console.log(userHome, process.platform)
}
function checkRoot() {
    if (process.geteuid) {
        const rootCheck = require('root-check')
        rootCheck()
    }
}

function checkPkgVersion() {
    log.notice('cli', pkg.version)
}
function checkNodeVersion() {
    const currentVersion = process.version;
    const lowerVersion = constant.LOWEST_NODE_VERSION;
    if (!semver.gte(currentVersion, lowerVersion)) {
        throw new Error(colors.red(`fighter-cli需要安装${lowerVersion}以上版本`))
    }
}