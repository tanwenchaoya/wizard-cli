'use strict';

const log = require('npmlog');
//修改level 当大于这个☞的时候某些输出才会生效
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL :'info';
log.heading = "fighter" //修改前缀
log.addLevel('success',2000,{fg:'green',bg:'yellow'});
module.exports = log;

// function index() {
//     // TODO
//     log.info('cli','test')
// }
