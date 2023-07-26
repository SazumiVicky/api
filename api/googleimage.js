async function googleImage(query) {
    try {
      const fetch = await import('node-fetch');
      const cheerio = require('cheerio');
  
      const data = await fetch.default(`https://www.google.com/search?q=${query}&tbm=isch`, {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-US,en;q=0.9,id;q=0.8',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
        },
      }).then((response) => response.text());
  
      const $ = cheerio.load(data);
      const pattern =
        /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
      const matches = [...$.html().matchAll(pattern)];
      const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));
  
      const imageUrls = matches
        .map(({ groups }) => decodeUrl(groups?.url))
        .filter((v) => /.*\.jpe?g|png$/gi.test(v));
  
      return imageUrls;
    } catch (error) {
      console.error('Error while fetching Google images:', error);
      throw new Error('Error while fetching Google images');
    }
  }
  
  module.exports = { googleImage };
  