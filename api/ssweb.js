const axios = require('axios');

async function sswebA(url = '', full = false, type = 'desktop') {
  type = type.toLowerCase();
  if (!['desktop', 'tablet', 'phone'].includes(type)) type = 'desktop';
  let form = new URLSearchParams();
  form.append('url', url);
  form.append('device', type);
  if (!!full) form.append('full', 'on');
  form.append('cacheLimit', 0);
  let res = await axios({
    url: 'https://www.screenshotmachine.com/capture.php',
    method: 'post',
    data: form
  });
  let cookies = res.headers['set-cookie'];
  let buffer = await axios({
    url: 'https://www.screenshotmachine.com/' + res.data.link,
    headers: {
      'cookie': cookies.join('')
    },
    responseType: 'arraybuffer'
  });
  return Buffer.from(buffer.data);
}

module.exports = { sswebA };
