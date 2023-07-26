const axios = require('axios');
const cheerio = require('cheerio');

exports.kbbi = async (query) => new Promise((resolve, reject) => {
    const url = 'https://kbbi.web.id/';

    axios.get(url + query).then(res => {
        const $ = cheerio.load(res.data);
        const arti = $('div#d1').text().trim();
        resolve(arti);
    }).catch(reject);
});
