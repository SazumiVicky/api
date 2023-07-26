const ytdl = require('ytdl-core');

function formatViews(views) {
  return views;
}

function formatDuration(durationSeconds) {
  return durationSeconds;
}

function formatFileSize(size) {
  return size;
}

async function ytmp4(url) {
  const id = ytdl.getVideoID(url);
  const data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);

  const formats = data.formats;
  const video = [];

  for (let i = 0; i < formats.length; i++) {
    const format = formats[i];

    if (format.container === 'mp4' && format.hasVideo && format.hasAudio) {
      video.push({
        quality: format.qualityLabel,
        url: format.url,
        size: format.contentLength || 'Desconocido'
      });
    }
  }

  const { title, description, thumbnails, ownerChannelName, viewCount, publishDate, lengthSeconds } = data.videoDetails;

  return {
    title,
    desc: description,
    thumb: thumbnails[0].url,
    channel: ownerChannelName,
    views: formatViews(viewCount),
    publish: publishDate,
    duration: formatDuration(lengthSeconds),
    sizeB: video[0].size,
    size: formatFileSize(video[0].size),
    quality: video[0].quality,
    dl_url: video[0].url
  };
}

module.exports = { ytmp4 };
