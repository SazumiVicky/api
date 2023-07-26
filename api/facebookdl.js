const axios = require('axios');
const cheerio = require('cheerio');

async function facebook(url) {
  try {
    const { data } = await axios.post('https://getmyfb.com/process', new URLSearchParams({
      id: decodeURIComponent(url),
      locale: 'en',
    }), {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'hx-current-url': 'https://getmyfb.com/',
        'hx-request': 'true',
        'hx-target': 'target',
        'hx-trigger': 'form',
        pragma: 'no-cache',
        Referer: 'https://getmyfb.com/',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    });

    const $ = cheerio.load(data);
    const title = $('.results-item-text')
      .text()
      .replace(/\s{2,}/g, '')
      .replace(/[\t\n]/g, '');
    const urls = [];

    $('.results-download > ul > li').each((i, e) => {
      const type = $(e).find('a').attr('download');
      const url = $(e).find('a').attr('href');

      if (/hd/i.test(type)) {
        urls.push({ quality: 'HD', url });
      } else if (/sd/i.test(type)) {
        urls.push({ quality: 'SD', url });
      }
    });

    if (urls.length === 0) {
      throw new Error('Upps, Erorr');
    }

    const hdUrl = urls.find(u => u.quality === 'HD');
    const videoUrl = hdUrl ? hdUrl.url : urls[0].url;

    return { title, videoUrl };
  } catch (e) {
    throw new Error(`Upps, Erorr ${e.message}`);
  }
}

module.exports = { facebook };
