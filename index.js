const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

const { sswebA } = require('./api/ssweb');
const { lyrics } = require('./api/lyric');
const { ytmp4 } = require('./api/ytmp4');
const { ytmp3 } = require('./api/ytmp3');
const { igdl, instagram } = require('./api/instagramdl');
const { googleImage } = require('./api/googleimage');
const { pinterest } = require('./api/pindl');
const { ttp } = require('./api/ttp');
const { facebook } = require('./api/facebookdl');
const { ArtiNama } = require('./api/artinama.js');
const { kbbi } = require('./api/kbbi.js');
const { manga } = require('./api/manga.js');
const chara = require('./api/chara');
app.use('/api/manga', require('./api/manga.js'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

// ssweb
app.get('/ssweb', async (req, res) => {
  const { url, full, type } = req.query;

  try {
    const screenshot = await sswebA(url, full, type);
    res.type('image/png');
    res.send(screenshot);
  } catch (error) {
    console.error('Error while taking screenshot:', error);
    res.status(500).json({ error: 'Error while taking screenshot' });
  }
});

// lyric
app.get('/lyrics', async (req, res) => {
  const search = req.query.search || '';

  try {
    const result = await lyrics(search);
    res.json(result);
  } catch (error) {
    console.error('Error while fetching lyrics:', error);
    res.status(500).json({ error: 'Error while fetching lyrics' });
  }
});

// ytmp4
app.get('/ytmp4', async (req, res) => {
  const url = req.query.url || '';

  try {
    const result = await ytmp4(url);
    res.json(result);
  } catch (error) {
    console.error('Error while downloading YouTube video:', error);
    res.status(500).json({ error: 'Error while downloading YouTube video' });
  }
});

// ytmp3
app.get('/ytmp3', async (req, res) => {
  const url = req.query.url || '';

  try {
    const result = await ytmp3(url);
    res.json(result);
  } catch (error) {
    console.error('Error while converting YouTube video to MP3:', error);
    res.status(500).json({ error: 'Error while converting YouTube video to MP3' });
  }
});

// igdl
app.get('/igdl', async (req, res) => {
  const url = req.query.url || '';

  try {
    const result = await igdl(url);
    res.json(result);
  } catch (error) {
    console.error('Error while downloading media from Instagram:', error);
    res.status(500).json({ error: 'Error while downloading media from Instagram' });
  }
});

app.get('/instagram', async (req, res) => {
  const url = req.query.url || '';

  try {
    const result = await instagram(url);
    res.json(result);
  } catch (error) {
    console.error('Error while downloading media from Instagram:', error);
    res.status(500).json({ error: 'Error while downloading media from Instagram' });
  }
});

// googleimage
app.get('/googleimage', async (req, res) => {
  const query = req.query.query || '';

  try {
    const result = await googleImage(query);
    res.json(result);
  } catch (error) {
    console.error('Error while fetching images from Google:', error);
    res.status(500).json({ error: 'Error while fetching images from Google' });
  }
});

// ttp
app.get('/ttp', async (req, res) => {
  const text = req.query.text || '';
  const tcolor = req.query.tcolor || '30F4EF';

  try {
    const result = await ttp(text, tcolor);
    res.json(result);
  } catch (error) {
    console.error('Error while generating transparent text effect:', error);
    res.status(500).json({ error: 'Error while generating transparent text effect' });
  }
});

// pinterest search
app.get('/pinterest', async (req, res) => {
  const { query } = req.query;

  try {
    const results = await pinterest(query);
    res.json(results);
  } catch (error) {
    console.error('Error while fetching images from Pinterest:', error);
    res.status(500).json({ error: 'Error while fetching images from Pinterest' });
  }
});

// facebook download
app.get('/facebook', async (req, res) => {
  const { url } = req.query;

  try {
    const videoData = await facebook(url);
    res.json(videoData);
  } catch (error) {
    console.error('Error while downloading video from Facebook:', error);
    res.status(500).json({ error: 'Error while downloading video from Facebook' });
  }
});


// chara
app.get('/chara', async (req, res) => {
  const query = req.query.query || '';

  try {
    const result = await chara(query);
    res.json(result);
  } catch (error) {
    console.error('Error while fetching character images:', error);
    res.status(500).json({ error: 'Error while fetching character images' });
  }
});

// artinama
app.get('/artinama', async (req, res) => {
  const { query } = req.query;
  try {
    const result = await ArtiNama(query);
    res.json({ arti: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// kbbi
app.get('/api/kbbi/:query', async (req, res) => {
  const query = req.params.query;
  try {
      const arti = await kbbi(query);
      res.json({ query, arti });
  } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data dari KBBI.' });
  }
});


// manga
app.get('/api/manga/:query', async (req, res) => {
  const query = req.params.query;
  try {
      const mangaList = await manga(query);
      res.json(mangaList);
  } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan saat mencari manga.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
