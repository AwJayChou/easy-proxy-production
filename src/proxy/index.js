const exec = require('child_process').exec;

module.exports = (pkg, config) => {
  const { port, host } = config || {}
  const eport = port || '8000'
  const ehost = host || 'localhost'
  const proxy = require('./systemProxyMgr');
  proxy.enableGlobalProxy(ehost, eport);
  proxy.enableGlobalProxy(ehost, eport, 'https');
  exec(`npx anyproxy --rule anyproxy.config.js`);

  process.on('SIGINT', function () {
    proxy.disableGlobalProxy(ehost, eport, 'http')
    proxy.disableGlobalProxy(ehost, eport, 'https')
    setTimeout(() => {
        process.exit();
    }, 1000)
  });
};

