const axios = require('axios');
const cheerio = require('cheerio');

exports.ArtiNama = (query) => {
  return new Promise((resolve, reject) => {
    queryy = query.replace(/ /g, '+');
    axios.get('https://www.primbon.com/arti_nama.php?nama1=' + query + '&proses=+Submit%21+')
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = $('#body').text();
        const result2 = result.split('\n      \n        \n        \n')[0];
        const result4 = result2.split('ARTI NAMA')[1];
        const result5 = result4.split('.\n\n');
        const result6 = result5[0] + '\n\n' + result5[1];
        resolve(result6);
      })
      .catch(reject);
  });
};
