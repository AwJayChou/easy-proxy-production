#!/usr/bin/env node
// process.env.NODE_PATH = __dirname + '/../node_modules/'
const { resolve } = require('path')
const res = command => resolve(__dirname, '../src/', command)
const program = require('commander')

// node 运行目录
const cwd = process.cwd();
console.log('## cwd ==>', cwd)
const configUrl = resolve(cwd, 'anyproxy.config.js')
const config = require(configUrl)
const pkg = require('../package');
const { version } = pkg;
program.version(version)

program.usage('<command>')

program.command('proxy')
//   .option('-f, --foo', 'enable some foo')
  .description('proxy pro to dev')
  .alias('p')
  .action(() => {
    require(res('proxy/index.js'))(pkg, config)
  })
program.parse(process.argv)
if (!program.args.length) {
  program.help()
}
