/* eslint-disable */
import SockJS from 'sockjs-client';

function createSocketClient(options) {
  const { host, port, prefix, proto } = options
  window.onload = function () {
    const sprefix = prefix || 'sockjs-node';
    const sport = port || '8080';
    const sorigin = host || 'localhost';
    const scheme = proto || 'http';
    const url = `${scheme}://${sorigin}:${sport}/${sprefix}`;
    console.log('## url ==>', url)
    var ws = new SockJS(url);
    ws.onopen = function () {
      console.log('## open')
      ws.send('from client: hello');
    };
    ws.onmessage = function (e) {
      console.log('## message', e)
      try {
        let ret = JSON.parse(e.data);
        switch (ret.type) {
          case 'hash':
            localStorage.setItem('currentHash', ret.data);
            // 第一次进入
            if (!localStorage.getItem('lastHash')) {
              localStorage.setItem('lastHash', ret.data);
            }
            break;
          case 'ok':
            const lastHash = localStorage.getItem('lastHash');
            const currentHash = localStorage.getItem('currentHash');
            console.log('## hashChange ==> ', lastHash, currentHash)
            if (currentHash !== lastHash) {
            //   const hashDom = document.getElementById('newHash');
            //   hashDom.innerHTML = currentHash;
              window.location.reload();
              localStorage.setItem('lastHash', currentHash);
            }
            break;
          case 'close':
            ws && ws.close();
        }
      } catch (error) {
        console.log('## error ==> ', error.message);
      }
    };
  };
}

export { createSocketClient };
