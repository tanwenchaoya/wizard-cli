'use strict';
const axios = require('axios')
const urljoin = require('url-join')
const semver = require('semver')
function getNpmInfo(npmName, registry) {
    if (!npmName) {
        return null
    }
    const registryUrl = registry || getDefaultRegistry()
    const npmInfoUrl = urljoin(registryUrl, npmName)
    return axios.get(npmInfoUrl).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    }).catch(err => {
        return promise.reject(err)
    })
    // TODO:https://registry.npmjs.org/@fighter-cli/core
}
async function getNpmVersion(npmName, registry) {
    const data = await getNpmInfo(npmName)
    if (data) {
        return Object.keys(data.versions)
    } else {
        return []
    }
}
function getNpmSemverVersions(baseVersion, versions) {
    //大于等于现在版本 
    return versions
        .filter(version => semver.satisfies(version, `^${baseVersion}`))
        .sort((a, b) =>  semver.gt(b, a))
}
async function getNpmSemverVersion(baseVersion, npmName, registry) {
    const versions = await getNpmVersion(npmName, registry)
    const newVersion = getNpmSemverVersions(baseVersion, versions)
    if(newVersion && newVersion.length > 0) {
        return newVersion[0]
    }
}
function getDefaultRegistry(isOriginal = false) {
    return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npmmirror.com'
}
module.exports = {
    getNpmInfo,
    getNpmVersion,
    getNpmSemverVersion
}
