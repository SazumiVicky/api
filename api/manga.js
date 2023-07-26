const axios = require('axios');
const cheerio = require('cheerio');

const manga = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.anime-planet.com/manga/all?name=${query}`)
            .then(({ data }) => {
                const hasil = [];
                const $ = cheerio.load(data);
                $('#siteContainer > ul.cardDeck.cardGrid > li ').each(function (a, b) {
                    const author = $(b).find('> div.additional').text().trim();
                    const result = {
                        status: 200,
                        author: author,
                        judul: $(b).find('> a > h3').text(),
                        link: 'https://www.anime-planet.com' + $(b).find('> a').attr('href'),
                        thumbnail: 'https://www.anime-planet.com' + $(b).find('> a > div.crop > img').attr('src')
                    };
                    hasil.push(result);
                });
                resolve(hasil);
            })
            .catch(reject);
    });
};

module.exports = manga;
