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

async function ytmp3(url) {
  try {
    const id = ytdl.getVideoID(url);
    const data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);
    
    const formats = data.formats;
    const audio = [];
    
    for (let i = 0; i < formats.length; i++) {
      const format = formats[i];
    
      if (format.mimeType === 'audio/webm; codecs="opus"') {
        audio.push({
          bitrate: format.audioBitrate,
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
      sizeB: audio[0].size,
      size: formatFileSize(audio[0].size),
      dl_url: audio[0].url
    };
  } catch (error) {
    throw new Error('Error while fetching YouTube audio data');
  }
}

module.exports = { ytmp3 };