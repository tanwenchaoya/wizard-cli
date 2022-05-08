module.exports = core;
const semver = require('semver');
const colors = require('colors/safe');
const pkg = require('../package.json')
const log = require('@fighter-cli/log')
const constant = require('./const')
function core(){
    try{
        checkPkgVersion()
        checkNodeVersion()
    }catch(e){
        log.error(e.message)
    }
    
}
function checkPkgVersion(){
    // log()
    // log.success('success','success test')
    log.notice('cli',pkg.version)
}
function checkNodeVersion(){
    const currentVersion = process.version;
    const lowerVersion = constant.LOWEST_NODE_VERSION;
    if(!semver.gte(currentVersion,lowerVersion)){
        throw new Error(colors.red( `fighter-cli需要安装${lowerVersion}以上版本`))
    }
}